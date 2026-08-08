import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClubContext } from '../context/ClubContext';
import Robot3D from '../components/animations/Robot3D';
import DronesCanvas from '../components/animations/DronesCanvas';
import { ArrowRight, Cpu, Code, Zap, Award, BookOpen, Calendar, HelpCircle } from 'lucide-react';

const Home = () => {
  const { projects, events, loading } = useContext(ClubContext);

  
  const featuredProjects = projects.slice(0, 3);
  const upcomingEvents = events.filter(e => e.date.toLowerCase().includes('2026') || e.date.toLowerCase().includes('upcoming')).slice(0, 2);

  
  const codeTicker = `void setup() { pinMode(13, OUTPUT); pinMode(sensorPin, INPUT); Serial.begin(9600); attachInterrupt(digitalPinToInterrupt(2), countEncoder, RISING); } // line-following sensor reading loop -- void loop() { int error = readSensors() - targetPosition; int motorSpeed = kp * error + kd * (error - lastError); lastError = error; setMotorSpeeds(baseSpeed + motorSpeed, baseSpeed - motorSpeed); delay(1); } // Drone sensor fusion Kalman filtering -- float dt = (micros() - lastTime) / 1000000.0; rate = readGyro() - bias; angle += dt * rate; P[0][0] += dt * (dt*P[1][1] - P[0][1] - P[1][0] + Q_angle); // ESP32 Wi-Fi IoT status telemetry updates -- WiFiClient client; if (client.connect(server, 80)) { client.print("POST /telemetry HTTP/1.1\\r\\nHost: yantronix-nitap.ac.in\\r\\nContent-Type: application/json\\r\\nContent-Length: "); }`;

  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 border-b border-cyber-border/20">
        {}
        <DronesCanvas />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyber-glow/30 bg-cyber-glow/5 text-cyber-glow text-xs font-mono"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>INNOVATING BEYOND BOUNDARIES</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-white leading-none"
            >
              Building the Future of <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 neon-text-cyan">
                Robotics & AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Welcome to <strong>यंत्रONIX </strong>, the Robotics and Automation Club of NIT Arunachal Pradesh. Our focus is primarily on mechanical structural design, linkage aerodynamics, and gearbox transmissions, integrated with control electronics.
            </motion.p>

            {}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/glossary"
                className="px-6 py-3 rounded-lg text-sm font-mono font-medium tracking-wide bg-gradient-to-r from-cyber-glow to-cyan-500 text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Explore Components
              </Link>
              <Link
                to="/events"
                className="px-6 py-3 rounded-lg text-sm font-mono font-medium tracking-wide border border-cyber-border hover:border-cyber-glow/50 text-gray-300 hover:text-white hover:bg-cyber-glow/5 transition-all duration-200"
              >
                Join Workshops
              </Link>
            </motion.div>
          </div>

          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <Robot3D />
          </motion.div>

        </div>
      </section>

      {}
      <div className="code-marquee-container py-3">
        <div className="code-marquee-content animate-marquee text-xs font-mono text-cyan-500/60 whitespace-nowrap">
          <span>{codeTicker}</span>
          <span>{codeTicker}</span> {}
        </div>
      </div>

      {}
      <section className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">WHAT WE DO</h2>
          <p className="text-3xl sm:text-4xl font-bold font-sans">Core Focus Areas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {}
          <div className="glass-card p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyber-glow">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans">Mechanical Kinematics</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Designing structural joints, linkages, chassis suspensions, and robotic arm kinematics using 3D modeling (CAD) and stress simulations.
            </p>
          </div>

          {}
          <div className="glass-card p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans">Actuators & Transmission</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Assembling spur & worm gear reducers, servo joints, torque multipliers, and pneumatic actuators for automated machine movements.
            </p>
          </div>

          {}
          <div className="glass-card p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans">Control Electronics</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Integrating sensory feedback loops, driver boards, and microcontroller firmware loops (like Arduino/ESP32 PID control) to run assemblies.
            </p>
          </div>

        </div>
      </section>

      {}
      <section className="py-20 bg-cyber-darker/40 border-t border-b border-cyber-border/10 relative">
        <div className="absolute inset-0 dots-overlay opacity-25"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div className="text-left space-y-2">
              <h2 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">PORTFOLIO</h2>
              <p className="text-3xl sm:text-4xl font-bold font-sans">Our Robotics Projects</p>
            </div>
            <Link
              to="/glossary"
              className="text-sm font-mono text-cyber-glow hover:text-white flex items-center space-x-1.5 transition-colors duration-200 group"
            >
              <span>Glossary Components</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 py-16 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 rounded-full border-4 border-cyber-glow/20 border-t-cyber-glow animate-spin"></div>
                <p className="text-sm font-mono text-cyan-400 animate-pulse tracking-wider">RETRIEVING PROJECTS...</p>
              </div>
            ) : featuredProjects.length === 0 ? (
              <div className="col-span-3 py-16 text-center glass-card rounded-2xl flex flex-col items-center justify-center space-y-4">
                <Cpu className="w-12 h-12 text-cyan-400 animate-bounce" />
                <div>
                  <h4 className="text-base font-bold text-white font-mono uppercase">Projects Coming Soon</h4>
                  <p className="text-xs text-gray-500 max-w-sm mt-1 mx-auto leading-relaxed">Our research and development logs are currently being initialized. Stay tuned for structural blueprints.</p>
                </div>
              </div>
            ) : (
              featuredProjects.map((project) => (
                <div key={project.id} className="glass-card rounded-2xl overflow-hidden flex flex-col text-left group">
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-cyber-border/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-90"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-border/60 text-cyan-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyber-glow transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <h2 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">SCHEDULE</h2>
            <p className="text-3xl font-bold font-sans">Club Events & Workshops</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We host hands-on development workshops, hackathons, and guest seminars throughout the academic semesters. Join us to build, break, and test hardware.
            </p>
            <div className="pt-2">
              <Link
                to="/events"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded border border-cyber-glow/40 text-cyber-glow text-xs font-mono bg-cyber-glow/5 hover:bg-cyber-glow/20 transition-all duration-300"
              >
                <span>View Full Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 rounded-full border-4 border-cyber-glow/20 border-t-cyber-glow animate-spin"></div>
                <p className="text-sm font-mono text-cyan-400 animate-pulse tracking-wider">RETRIEVING SCHEDULE...</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="py-16 text-center glass-card rounded-2xl flex flex-col items-center justify-center space-y-4">
                <Calendar className="w-12 h-12 text-cyan-400 animate-pulse" />
                <div>
                  <h4 className="text-base font-bold text-white font-mono uppercase">Schedule Coming Soon</h4>
                  <p className="text-xs text-gray-500 max-w-sm mt-1 mx-auto leading-relaxed">No upcoming events scheduled at this moment. The academic calendar telemetry is updating.</p>
                </div>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center text-left border-l-4 border-l-cyber-glow">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-mono text-cyber-glow">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                      <span>&bull;</span>
                      <span className="px-2 py-0.5 rounded bg-cyber-border text-emerald-400 text-[10px]">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-sans text-white">{event.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{event.description}</p>
                    <p className="text-[10px] font-mono text-gray-500">Venue: {event.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
