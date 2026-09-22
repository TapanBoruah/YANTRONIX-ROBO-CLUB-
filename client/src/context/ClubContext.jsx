import React, { createContext, useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const fetch = (url, options) => globalThis.fetch(getApiUrl(url), options);

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [glossary, setGlossary] = useState([]);
  const [team, setTeam] = useState({
    coordinator: null,
    president: null,
    core: [],
    members: [],
    past: []
  });
  const [roster, setRoster] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('yantronix_admin_auth') === 'true';
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const local = localStorage.getItem('yantronix_logged_in_user');
    return local ? JSON.parse(local) : null;
  });

  const [loading, setLoading] = useState(true);

  
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [projRes, evtsRes, glossRes, teamRes, rostRes, gallRes] = await Promise.all([
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/events').then(res => res.json()),
        fetch('/api/glossary').then(res => res.json()),
        fetch('/api/team').then(res => res.json()),
        fetch('/api/roster').then(res => res.json()),
        fetch('/api/gallery').then(res => res.json())
      ]);

      const mapDoc = (doc) => ({ ...doc, id: doc._id });

      setProjects(projRes.map(mapDoc));
      setEvents(evtsRes.map(mapDoc));
      setGlossary(glossRes.map(mapDoc));
      setRoster(rostRes.map(mapDoc));
      setGallery(gallRes.map(mapDoc));

      
      const flatTeam = teamRes;
      const isPastMember = (m) => {
        if (!m.endDate) return false;
        const cleanEnd = m.endDate.trim().toLowerCase();
        if (cleanEnd === '' || cleanEnd === 'present' || cleanEnd === 'till present') {
          return false;
        }

        const endDateTime = Date.parse(m.endDate);
        if (!isNaN(endDateTime)) {
          return endDateTime < Date.now();
        }

        const yearRegex = /^[12][0-9]{3}$/;
        if (yearRegex.test(m.endDate.trim())) {
          const endYear = parseInt(m.endDate.trim());
          const currentYear = new Date().getFullYear();
          return endYear < currentYear;
        }

        return true;
      };

      const coordinatorDoc = flatTeam.find(t => t.type === 'coordinator' && !isPastMember(t));
      const presidentDoc = flatTeam.find(t => t.type === 'president' && !isPastMember(t));

      const structuredTeam = {
        coordinator: coordinatorDoc ? { ...coordinatorDoc, id: coordinatorDoc._id } : null,
        president: presidentDoc ? { ...presidentDoc, id: presidentDoc._id } : null,
        core: flatTeam.filter(t => t.type === 'core' && !isPastMember(t)).map(mapDoc),
        members: flatTeam.filter(t => t.type === 'member' && !isPastMember(t)).map(mapDoc),
        past: flatTeam.filter(t => isPastMember(t)).map(mapDoc)
      };
      setTeam(structuredTeam);

      // Check if loggedInUser is out of sync due to database reseeding or ID changes
      const currentUserStr = localStorage.getItem('yantronix_logged_in_user');
      if (currentUserStr) {
        try {
          const currentUserObj = JSON.parse(currentUserStr);
          if (currentUserObj && currentUserObj.name) {
            const cleanName = currentUserObj.name.toLowerCase();
            if (currentUserObj.role === 'member') {
              const matchingRoster = rostRes.find(r => r.username && r.username.toLowerCase() === cleanName);
              if (matchingRoster && matchingRoster._id !== currentUserObj.id) {
                console.log('Auto-healing roster member session ID from', currentUserObj.id, 'to', matchingRoster._id);
                const updatedUser = { ...currentUserObj, id: matchingRoster._id };
                setLoggedInUser(updatedUser);
                localStorage.setItem('yantronix_logged_in_user', JSON.stringify(updatedUser));
              }
            } else {
              const matchingMember = teamRes.find(m => m.username && m.username.toLowerCase() === cleanName);
              if (matchingMember && matchingMember._id !== currentUserObj.id) {
                console.log('Auto-healing team member session ID from', currentUserObj.id, 'to', matchingMember._id);
                const updatedUser = { ...currentUserObj, id: matchingMember._id };
                setLoggedInUser(updatedUser);
                localStorage.setItem('yantronix_logged_in_user', JSON.stringify(updatedUser));
              }
            }
          }
        } catch (e) {
          console.error('Error parsing loggedInUser for session auto-heal:', e);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data from backend API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const userObj = await response.json();
        setLoggedInUser(userObj);
        localStorage.setItem('yantronix_logged_in_user', JSON.stringify(userObj));
        setIsAdminLoggedIn(true);
        localStorage.setItem('yantronix_admin_auth', 'true');
        return true;
      }
    } catch (error) {
      console.error('Login request failed:', error);
    }
    return false;
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('yantronix_logged_in_user');
    setIsAdminLoggedIn(false);
    localStorage.removeItem('yantronix_admin_auth');
  };

  


  
  const addProject = async (project) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };
  const updateProject = async (id, updated) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };
  const deleteProject = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  
  const addEvent = async (event) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };
  const updateEvent = async (id, updated) => {
    try {
      await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };
  const deleteEvent = async (id) => {
    try {
      await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  
  const addGlossary = async (item) => {
    try {
      await fetch('/api/glossary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add glossary entry:', error);
    }
  };
  const updateGlossary = async (id, updated) => {
    try {
      await fetch(`/api/glossary/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to update glossary entry:', error);
    }
  };
  const deleteGlossary = async (id) => {
    try {
      await fetch(`/api/glossary/${id}`, {
        method: 'DELETE'
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to delete glossary entry:', error);
    }
  };

  
  const addTeamMember = async (member, type) => {
    try {
      const payload = type === 'core' 
        ? { ...member, type: 'core' } 
        : { name: member.name, type: 'member' };
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add team member:', error);
    }
  };
  const updateTeamMember = async (id, updated, type) => {
    try {
      let targetId = id || updated._id || updated.id;
      if (!targetId && (type === 'coordinator' || type === 'president')) {
        const flatTeam = await fetch('/api/team').then(res => res.json());
        const matched = flatTeam.find(t => t.type === type);
        if (matched) {
          targetId = matched._id;
        }
      }
      if (targetId) {
        await fetch(`/api/team/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updated, type })
        });
        await fetchAllData();
      }
    } catch (error) {
      console.error('Failed to update team member:', error);
    }
  };
  const deleteTeamMember = async (id, name, type) => {
    try {
      let targetId = id;
      if (!targetId && type === 'members' && name) {
        const flatTeam = await fetch('/api/team').then(res => res.json());
        const matched = flatTeam.find(t => t.type === 'member' && t.name === name);
        if (matched) {
          targetId = matched._id;
        }
      }
      if (targetId) {
        await fetch(`/api/team/${targetId}`, {
          method: 'DELETE'
        });
        await fetchAllData();
      }
    } catch (error) {
      console.error('Failed to delete team member:', error);
    }
  };

  
  const addRosterMember = async (member) => {
    try {
      await fetch('/api/roster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add roster member:', error);
    }
  };
  const updateRosterMember = async (id, updated) => {
    try {
      await fetch(`/api/roster/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to update roster member:', error);
    }
  };
  const deleteRosterMember = async (id) => {
    try {
      await fetch(`/api/roster/${id}`, {
        method: 'DELETE'
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to delete roster member:', error);
    }
  };

  const addGallery = async (item) => {
    try {
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to add gallery item:', error);
    }
  };
  const updateGallery = async (id, updated) => {
    try {
      await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to update gallery item:', error);
    }
  };
  const deleteGallery = async (id) => {
    try {
      await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      });
      await fetchAllData();
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
    }
  };

  const createUser = async (userPayload) => {
    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });
      if (response.ok) {
        await fetchAllData();
        return { success: true };
      } else {
        const errData = await response.json();
        return { success: false, message: errData.message || 'Failed to create user.' };
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      return { success: false, message: 'Server connection error.' };
    }
  };

  const updateCredentials = async (targetId, newUsername, newPassword) => {
    try {
      const response = await fetch('/api/users/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, newUsername, newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        if (data.username && loggedInUser && (loggedInUser.id === targetId || loggedInUser._id === targetId)) {
          const updatedUser = { ...loggedInUser, name: data.username.toUpperCase() };
          setLoggedInUser(updatedUser);
          localStorage.setItem('yantronix_logged_in_user', JSON.stringify(updatedUser));
        }
        return { success: true, username: data.username };
      } else {
        return { success: false, message: data.message || 'Failed to update credentials.' };
      }
    } catch (error) {
      console.error('Failed to update credentials:', error);
      return { success: false, message: 'Server connection error.' };
    }
  };

  return (
    <ClubContext.Provider value={{
      projects, events, glossary, team, roster, gallery, isAdminLoggedIn, loggedInUser, loading,
      login, logout,
      addProject, updateProject, deleteProject,
      addEvent, updateEvent, deleteEvent,
      addGlossary, updateGlossary, deleteGlossary,
      addTeamMember, updateTeamMember, deleteTeamMember,
      addRosterMember, updateRosterMember, deleteRosterMember,
      addGallery, updateGallery, deleteGallery,
      createUser, updateCredentials
    }}>
      {children}
    </ClubContext.Provider>
  );
};

