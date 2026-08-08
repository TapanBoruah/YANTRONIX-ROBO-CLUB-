import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardModal = ({
  isOpen,
  onClose,
  activeTab,
  modalType,
  formData,
  setFormData,
  handleSubmit,
  uploadingImage,
  handleImageUpload,
  workingStepInput,
  setWorkingStepInput,
  loggedInUser
}) => {
  if (!isOpen) return null;

  const isFaculty = formData.type === 'coordinator' || (formData.role && formData.role.toLowerCase().includes('faculty'));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-cyber-card border border-cyber-glow/30 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.25)] text-left flex flex-col max-h-[90vh]"
        >
          {}
          <div className="px-6 py-4 border-b border-cyber-border flex items-center justify-between">
            <h3 className="text-lg font-bold text-white uppercase font-sans">
              {modalType === 'add' ? 'Create new' : 'Update'} {activeTab === 'my_profile' ? 'Profile' : activeTab === 'my_record' ? 'Record' : activeTab} Item
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-cyber-border text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow">
            
            {}
            {activeTab === 'projects' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none focus:border-cyber-glow/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Tags (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Robotics, Arduino, PID"
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none focus:border-cyber-glow/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none focus:border-cyber-glow/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Image Upload / URL</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL or choose file..."
                      className="flex-grow px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-cyber-border hover:bg-cyber-glow hover:text-black rounded text-xs font-mono transition-colors whitespace-nowrap">
                      {uploadingImage ? 'Uploading...' : 'Choose File'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {}
            {activeTab === 'events' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Event Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Date / Month</label>
                    <input
                      type="text"
                      required
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. Feb 2026"
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Event Type</label>
                    <select
                      value={formData.type || 'Workshop'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Competition">Competition</option>
                      <option value="Webinar">Webinar</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Location / Venue</label>
                  <input
                    type="text"
                    required
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Mechanical Hall, NIT AP"
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Image Upload / URL</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL or choose file..."
                      className="flex-grow px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-cyber-border hover:bg-cyber-glow hover:text-black rounded text-xs font-mono transition-colors whitespace-nowrap">
                      {uploadingImage ? 'Uploading...' : 'Choose File'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {}
            {activeTab === 'glossary' && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Component Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Symbol (ID)</label>
                    <select
                      value={formData.symbol || 'MCU'}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    >
                      <option value="MCU">MCU</option>
                      <option value="MOTOR">MOTOR</option>
                      <option value="US_SENS">US_SENS</option>
                      <option value="TX_RX">TX_RX</option>
                      <option value="FC_UAV">FC_UAV</option>
                      <option value="DHT22">DHT22</option>
                      <option value="IR_SENS">IR_SENS</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Theory & Description</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.theory || ''}
                    onChange={(e) => setFormData({ ...formData, theory: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>

                {}
                <div className="space-y-2 pt-2 border-t border-cyber-border/20">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Working Steps List</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={workingStepInput}
                      onChange={(e) => setWorkingStepInput(e.target.value)}
                      placeholder="Type a step..."
                      className="flex-grow px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (workingStepInput.trim()) {
                          const updatedWorking = [...(formData.working || []), workingStepInput.trim()];
                          setFormData({ ...formData, working: updatedWorking });
                          setWorkingStepInput('');
                        }
                      }}
                      className="px-4 py-2 bg-cyber-border hover:bg-cyber-glow hover:text-black transition-colors rounded text-xs font-mono"
                    >
                      Add Step
                    </button>
                  </div>

                  {}
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {formData.working && formData.working.map((step, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-sans text-gray-300 p-2 bg-cyber-darker/60 rounded border border-cyber-border/40">
                        <span>{idx + 1}. {step}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.working.filter((_, sIdx) => sIdx !== idx);
                            setFormData({ ...formData, working: updated });
                          }}
                          className="text-red-400 hover:text-red-300 font-mono text-xs focus:outline-none ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {}
            {(activeTab === 'team' || activeTab === 'my_profile') && (
              <>
                {activeTab === 'team' && modalType === 'add' ? (
                  <>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Login Username</label>
                      <input
                        type="text"
                        required
                        value={formData.username || ''}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Access Password</label>
                      <input
                        type="password"
                        required
                        value={formData.password || ''}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Position Category</label>
                      <select
                        value={formData.position || 'core committee'}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      >
                        <option value="faculty">Faculty Advisor/Coordinator</option>
                        <option value="president">President</option>
                        <option value="vice_president">Vice President</option>
                        <option value="web_coordinator">Web Coordinator</option>
                        <option value="student_representative">Student Representative</option>
                        <option value="core committee">Core Committee</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Position Category</label>
                      <select
                        value={formData.position || 'core committee'}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                      >
                        <option value="faculty">Faculty Advisor/Coordinator</option>
                        <option value="president">President</option>
                        <option value="vice_president">Vice President</option>
                        <option value="web_coordinator">Web Coordinator</option>
                        <option value="student_representative">Student Representative</option>
                        <option value="core committee">Core Committee</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono text-gray-400 uppercase">Designation Role</label>
                        <input
                          type="text"
                          required
                          value={formData.role || ''}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. Vice President"
                          className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-mono text-gray-400 uppercase">Contact Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@nitap.ac.in"
                          className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono text-gray-400 uppercase">GitHub Profile URL</label>
                        <input
                          type="url"
                          value={formData.github || ''}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-mono text-gray-400 uppercase">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={formData.linkedin || ''}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {isFaculty ? (
                        <div className="col-span-2 space-y-1">
                          <label className="block text-xs font-mono text-gray-400 uppercase">Phone Number</label>
                          <input
                            type="tel"
                            value={formData.phone || ''}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <label className="block text-xs font-mono text-gray-400 uppercase">Roll Number</label>
                            <input
                              type="text"
                              value={formData.roll || ''}
                              onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                              placeholder="e.g. ME/24/05"
                              className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-xs font-mono text-gray-400 uppercase">Phone Number</label>
                            <input
                              type="tel"
                              value={formData.phone || ''}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="e.g. +91 98765 43210"
                              className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {!isFaculty && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-mono text-gray-400 uppercase">Academic Year</label>
                          <select
                            value={formData.year || '1st Year'}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-xs font-mono text-gray-400 uppercase">Semester</label>
                          <select
                            value={formData.sem || '1st Sem'}
                            onChange={(e) => setFormData({ ...formData, sem: e.target.value })}
                            className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                          >
                            <option value="1st Sem">1st Sem</option>
                            <option value="2nd Sem">2nd Sem</option>
                            <option value="3rd Sem">3rd Sem</option>
                            <option value="4th Sem">4th Sem</option>
                            <option value="5th Sem">5th Sem</option>
                            <option value="6th Sem">6th Sem</option>
                            <option value="7th Sem">7th Sem</option>
                            <option value="8th Sem">8th Sem</option>
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Avatar Image Upload / URL</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Paste avatar URL or choose file..."
                          className="flex-grow px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                        />
                        <label className="cursor-pointer px-3 py-2 bg-cyber-border hover:bg-cyber-glow hover:text-black rounded text-xs font-mono transition-colors whitespace-nowrap">
                          {uploadingImage ? 'Uploading...' : 'Choose File'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    </div>

                    {loggedInUser?.role === 'super' && modalType === 'edit' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-mono text-gray-400 uppercase">Display Order <span className="text-gray-600">(1 = first, higher = later)</span></label>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={formData.order ?? ''}
                          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 99 })}
                          placeholder="e.g. Faculty=1, President=2, VP=3..."
                          className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyan-500/30 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                        />
                        <p className="text-[10px] text-gray-600 font-mono">Default: Faculty 1 · President 2 · VP 3 · Web Coord 4 · Core 5 · Members 99</p>
                      </div>
                    )}
                  </>
                )}

                    {(activeTab === 'my_profile' || activeTab === 'my_record') && modalType === 'edit' && (
                      <div className="pt-4 border-t border-cyber-border/20 space-y-3">
                        <p className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest">Change Login Credentials (optional)</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-xs font-mono text-gray-400 uppercase">New Username</label>
                            <input
                              type="text"
                              value={formData.newUsername || ''}
                              onChange={(e) => setFormData({ ...formData, newUsername: e.target.value })}
                              placeholder="Leave blank to keep current"
                              className="w-full px-3 py-2 rounded bg-cyber-darker border border-yellow-500/30 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-xs font-mono text-gray-400 uppercase">New Password</label>
                            <input
                              type="password"
                              value={formData.newPassword || ''}
                              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                              placeholder="Leave blank to keep current"
                              className="w-full px-3 py-2 rounded bg-cyber-darker border border-yellow-500/30 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                            />
                          </div>
                        </div>
                      </div>
                    )}
              </>
            )}

            {}
            {(activeTab === 'roster' || activeTab === 'my_record') && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={formData.roll || ''}
                      onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                      placeholder="e.g. ME/24/05"
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="member@nitap.ac.in"
                    className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Academic Year</label>
                    <select
                      value={formData.year || '1st Year'}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">Semester</label>
                    <select
                      value={formData.sem || '1st Sem'}
                      onChange={(e) => setFormData({ ...formData, sem: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    >
                      <option value="1st Sem">1st Sem</option>
                      <option value="2nd Sem">2nd Sem</option>
                      <option value="3rd Sem">3rd Sem</option>
                      <option value="4th Sem">4th Sem</option>
                      <option value="5th Sem">5th Sem</option>
                      <option value="6th Sem">6th Sem</option>
                      <option value="7th Sem">7th Sem</option>
                      <option value="8th Sem">8th Sem</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={formData.github || ''}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-400 uppercase">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={formData.linkedin || ''}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-400 uppercase">Avatar Image Upload / URL</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste avatar URL or choose file..."
                      className="flex-grow px-3 py-2 rounded bg-cyber-darker border border-cyber-border text-sm text-white focus:outline-none"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-cyber-border hover:bg-cyber-glow hover:text-black rounded text-xs font-mono transition-colors whitespace-nowrap">
                      {uploadingImage ? 'Uploading...' : 'Choose File'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {}
            <div className="pt-4 border-t border-cyber-border/20 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-cyber-border hover:bg-cyber-card/80 rounded text-xs font-mono text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyber-glow text-black font-semibold rounded text-xs font-mono hover:scale-102 transition-transform"
              >
                Save Changes
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DashboardModal;
