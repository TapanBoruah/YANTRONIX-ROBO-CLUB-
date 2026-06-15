import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClubContext } from '../context/ClubContext';
import { 
  Shield, LogOut, LayoutGrid, Calendar, BookOpen, Users, 
  Plus, RotateCcw, ExternalLink, ClipboardList
} from 'lucide-react';


import ProjectsTable from '../components/dashboard/ProjectsTable';
import EventsTable from '../components/dashboard/EventsTable';
import GlossaryTable from '../components/dashboard/GlossaryTable';
import RosterTable from '../components/dashboard/RosterTable';
import TeamSection from '../components/dashboard/TeamSection';
import MyProfileSection from '../components/dashboard/MyProfileSection';
import MyRecordSection from '../components/dashboard/MyRecordSection';
import DashboardModal from '../components/dashboard/DashboardModal';

const AdminDashboard = () => {
  const { 
    projects, events, glossary, team, roster, isAdminLoggedIn, loggedInUser, logout,
    addProject, updateProject, deleteProject,
    addEvent, updateEvent, deleteEvent,
    addGlossary, updateGlossary, deleteGlossary,
    addTeamMember, updateTeamMember, deleteTeamMember,
    addRosterMember, updateRosterMember, deleteRosterMember,
    createUser, loading, updateCredentials
  } = useContext(ClubContext);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); 
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [editId, setEditId] = useState(null);
  
  
  const [formData, setFormData] = useState({});
  const [workingStepInput, setWorkingStepInput] = useState(''); 
  const [uploadingImage, setUploadingImage] = useState(false);

  
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role === 'super' || loggedInUser.role === 'core') {
        setActiveTab('my_profile');
      } else if (loggedInUser.role === 'member') {
        setActiveTab('my_record');
      } else {
        setActiveTab('projects');
      }
    }
  }, [loggedInUser]);

  if (!isAdminLoggedIn) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  
  const openAddModal = () => {
    setModalType('add');
    setEditId(null);
    setFormData(getInitialFormFields(activeTab));
    setIsModalOpen(true);
  };

  
  const openEditModal = (item) => {
    setModalType('edit');
    setEditId(item.id);
    
    
    if (activeTab === 'team' && !item.id) {
      
      setFormData(item);
    } else {
      setFormData({ ...item });
    }
    setIsModalOpen(true);
  };

  const getInitialFormFields = (tab) => {
    switch (tab) {
      case 'projects':
        return { title: '', description: '', tags: '', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' };
      case 'events':
        return { title: '', date: '', description: '', type: 'Workshop', location: '', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' };
      case 'glossary':
        return { name: '', symbol: '', theory: '', working: [] };
      case 'team':
        return { name: '', username: '', password: '', position: 'core committee' };
      case 'roster':
        return { name: '', roll: '', phone: '', email: '', year: '1st Year', sem: '1st Sem' };
      default:
        return {};
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === 'projects') {
      const processedTags = typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags;

      const projectPayload = { ...formData, tags: processedTags };

      if (modalType === 'add') {
        await addProject(projectPayload);
      } else {
        await updateProject(editId, projectPayload);
      }
    } 
    else if (activeTab === 'events') {
      if (modalType === 'add') {
        await addEvent(formData);
      } else {
        await updateEvent(editId, formData);
      }
    } 
    else if (activeTab === 'glossary') {
      if (modalType === 'add') {
        await addGlossary(formData);
      } else {
        await updateGlossary(editId, formData);
      }
    } 
    else if (activeTab === 'team' || activeTab === 'my_profile') {
      if (modalType === 'add') {
        const res = await createUser(formData);
        if (!res.success) {
          alert(res.message);
          return;
        }
      } else {
        const memberType = formData.type || 'core';
        await updateTeamMember(editId, formData, memberType);

        if (activeTab === 'my_profile' && loggedInUser?.role === 'super' && (formData.newUsername || formData.newPassword)) {
          const credRes = await updateCredentials(loggedInUser.id, formData.newUsername, formData.newPassword);
          if (!credRes.success) {
            alert('Profile saved, but credential update failed: ' + credRes.message);
          }
        }
      }
    }
    else if (activeTab === 'roster' || activeTab === 'my_record') {
      if (modalType === 'add') {
        addRosterMember(formData);
      } else {
        updateRosterMember(editId, formData);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, name, type) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;

    if (activeTab === 'projects') {
      deleteProject(id);
    } else if (activeTab === 'events') {
      deleteEvent(id);
    } else if (activeTab === 'glossary') {
      deleteGlossary(id);
    } else if (activeTab === 'team') {
      deleteTeamMember(id, name, type);
    } else if (activeTab === 'roster') {
      deleteRosterMember(id);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg flex flex-col relative text-left">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>

      {}
      <header className="border-b border-cyber-border/80 bg-cyber-card/50 backdrop-blur-md relative z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-cyber-glow animate-pulse" />
          <h1 className="text-lg font-bold font-sans tracking-wide text-white">YANTRONIX CONTROL COCKPIT</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-1 px-3 py-1.5 rounded border border-cyber-border text-xs text-gray-400 hover:text-white transition-colors"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-1.5 rounded border border-red-500/30 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </button>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row relative z-10">
        
        {}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-cyber-border/40 p-4 space-y-2 flex-shrink-0">
          {loggedInUser?.role === 'super' && (
            <>
              <button
                onClick={() => handleTabChange('projects')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'projects' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Manage Projects</span>
              </button>
              <button
                onClick={() => handleTabChange('events')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'events' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Manage Events</span>
              </button>
              <button
                onClick={() => handleTabChange('glossary')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'glossary' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Manage Glossary</span>
              </button>
              <button
                onClick={() => handleTabChange('team')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'team' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Manage Team</span>
              </button>
              <button
                onClick={() => handleTabChange('roster')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'roster' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Club Roster Directory</span>
              </button>
            </>
          )}

          {(loggedInUser?.role === 'super' || loggedInUser?.role === 'core') && (
            <button
              onClick={() => handleTabChange('my_profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'my_profile' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>My Profile Details</span>
            </button>
          )}

          {loggedInUser?.role === 'member' && (
            <button
              onClick={() => handleTabChange('my_record')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'my_record' ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>My Student Record</span>
            </button>
          )}
        </aside>

        {}
        <main className="flex-grow p-6 sm:p-8 overflow-x-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border/20 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">
                  {activeTab === 'my_profile' ? 'Core Profile' : activeTab === 'my_record' ? 'Student Record' : `${activeTab} Database`}
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  {loggedInUser?.role === 'super' ? 'Clearance Level: Super Admin (Full Access)' : `Clearance Level: Restricted (${loggedInUser?.role.toUpperCase()})`}
                </p>
              </div>
              {}
              {loggedInUser?.role === 'super' && (
                <button
                  onClick={openAddModal}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-cyber-glow text-black font-semibold text-xs font-mono rounded hover:scale-103 transition-transform shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>ADD NEW ITEM</span>
                </button>
              )}
            </div>

            {}
            <div className="bg-cyber-card rounded-xl border border-cyber-border overflow-hidden">
              {activeTab === 'projects' && (
                <ProjectsTable projects={projects} onEdit={openEditModal} onDelete={handleDelete} />
              )}

              {activeTab === 'events' && (
                <EventsTable events={events} onEdit={openEditModal} onDelete={handleDelete} />
              )}

              {activeTab === 'glossary' && (
                <GlossaryTable glossary={glossary} onEdit={openEditModal} onDelete={handleDelete} />
              )}

              {activeTab === 'team' && (
                <TeamSection team={team} loggedInUser={loggedInUser} onEdit={openEditModal} onDelete={handleDelete} onAddMember={openAddModal} />
              )}

              {activeTab === 'roster' && (
                <RosterTable roster={roster} loggedInUser={loggedInUser} onEdit={openEditModal} onDelete={handleDelete} />
              )}

              {activeTab === 'my_profile' && (
                loading
                  ? <div className="flex items-center justify-center py-20 text-sm font-mono text-gray-500"><span className="animate-pulse">Loading profile data...</span></div>
                  : <MyProfileSection team={team} loggedInUser={loggedInUser} onEdit={openEditModal} />
              )}

              {activeTab === 'my_record' && (
                loading
                  ? <div className="flex items-center justify-center py-20 text-sm font-mono text-gray-500"><span className="animate-pulse">Loading record data...</span></div>
                  : <MyRecordSection roster={roster} loggedInUser={loggedInUser} onEdit={openEditModal} />
              )}
            </div>

          </div>
        </main>
      </div>

      {}
      <DashboardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        modalType={modalType}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        uploadingImage={uploadingImage}
        handleImageUpload={handleImageUpload}
        workingStepInput={workingStepInput}
        setWorkingStepInput={setWorkingStepInput}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default AdminDashboard;
