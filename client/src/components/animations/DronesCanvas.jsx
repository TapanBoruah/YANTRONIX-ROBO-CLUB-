import React, { useEffect, useRef } from 'react';

const DronesCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    
    const particles = [];
    const numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1
      });
    }

    
    const drones = [
      { x: 100, y: 150, targetX: 150, targetY: 120, vx: 0, vy: 0, angle: 0, scale: 0.8 },
      { x: 300, y: 250, targetX: 250, targetY: 280, vx: 0, vy: 0, angle: 0, scale: 0.6 },
    ];

    
    const arm = {
      shoulderX: 0,
      shoulderY: 0,
      l1: 120, 
      l2: 100, 
      elbowX: 0,
      elbowY: 0,
      wristX: 0,
      wristY: 0,
    };

    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      arm.shoulderX = canvas.width;
      arm.shoulderY = canvas.height * 0.75;

      
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      
      drones.forEach((drone, idx) => {
        
        if (Math.random() < 0.01) {
          drone.targetX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
          drone.targetY = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
        }

        
        const dx = drone.targetX - drone.x;
        const dy = drone.targetY - drone.y;
        drone.vx += dx * 0.001;
        drone.vy += dy * 0.001;
        
        
        drone.vx *= 0.98;
        drone.vy *= 0.98;
        
        drone.x += drone.vx;
        drone.y += drone.vy;
        drone.angle = Math.sin(Date.now() * 0.002 + idx) * 0.05;

        
        ctx.save();
        ctx.translate(drone.x, drone.y);
        ctx.rotate(drone.angle);
        ctx.scale(drone.scale, drone.scale);

        
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.fillStyle = '#0a0f1d';
        ctx.lineWidth = 2.5;
        
        
        ctx.beginPath();
        ctx.moveTo(-40, -40);
        ctx.lineTo(40, 40);
        ctx.moveTo(-40, 40);
        ctx.lineTo(40, -40);
        ctx.stroke();

        
        const rotorOffset = 40;
        const rotorRadius = 12;
        const rotorSpinAngle = (Date.now() * 0.05) % (Math.PI * 2);
        
        [
          [-rotorOffset, -rotorOffset],
          [rotorOffset, -rotorOffset],
          [-rotorOffset, rotorOffset],
          [rotorOffset, rotorOffset]
        ].forEach(([rx, ry]) => {
          ctx.beginPath();
          ctx.arc(rx, ry, rotorRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(10, 15, 29, 0.9)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
          ctx.stroke();

          
          ctx.beginPath();
          ctx.moveTo(rx - Math.cos(rotorSpinAngle) * rotorRadius, ry - Math.sin(rotorSpinAngle) * rotorRadius);
          ctx.lineTo(rx + Math.cos(rotorSpinAngle) * rotorRadius, ry + Math.sin(rotorSpinAngle) * rotorRadius);
          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.stroke();

        
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = (Date.now() % 1000 < 500) ? '#00f2fe' : '#10b981';
        ctx.fill();

        ctx.restore();

        
        if (idx === 0 && mouseRef.current.x !== null) {
          const distToMouse = Math.hypot(drone.x - mouseRef.current.x, drone.y - mouseRef.current.y);
          if (distToMouse < 250) {
            ctx.beginPath();
            ctx.moveTo(drone.x, drone.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      });

      
      const targetX = mouseRef.current.x !== null ? mouseRef.current.x : canvas.width * 0.7;
      const targetY = mouseRef.current.y !== null ? mouseRef.current.y : canvas.height * 0.4;

      
      const dx = targetX - arm.shoulderX;
      const dy = targetY - arm.shoulderY;
      const d = Math.hypot(dx, dy);

      
      let angle1, angle2;
      const l1 = arm.l1;
      const l2 = arm.l2;

      if (d >= l1 + l2) {
        
        angle1 = Math.atan2(dy, dx);
        angle2 = 0;
      } else {
        const cosAngle2 = (d*d - l1*l1 - l2*l2) / (2 * l1 * l2);
        angle2 = Math.acos(Math.max(-1, Math.min(1, cosAngle2)));
        
        const alpha = Math.atan2(dy, dx);
        const beta = Math.atan2(l2 * Math.sin(angle2), l1 + l2 * Math.cos(angle2));
        angle1 = alpha - beta;
      }

      
      arm.elbowX = arm.shoulderX + l1 * Math.cos(angle1);
      arm.elbowY = arm.shoulderY + l1 * Math.sin(angle1);
      arm.wristX = arm.elbowX + l2 * Math.cos(angle1 + angle2);
      arm.wristY = arm.elbowY + l2 * Math.sin(angle1 + angle2);

      
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      
      ctx.beginPath();
      ctx.arc(arm.shoulderX, arm.shoulderY, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0f1d';
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.stroke();

      
      ctx.beginPath();
      ctx.moveTo(arm.shoulderX, arm.shoulderY);
      ctx.lineTo(arm.elbowX, arm.elbowY);
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();
      
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#06b6d4';
      ctx.stroke();

      
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(arm.elbowX, arm.elbowY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0f1d';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.stroke();

      
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(arm.elbowX, arm.elbowY);
      ctx.lineTo(arm.wristX, arm.wristY);
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();
      
      
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#00f2fe';
      ctx.stroke();

      
      ctx.beginPath();
      ctx.arc(arm.wristX, arm.wristY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.fill();

      
      const wristAngle = angle1 + angle2;
      const fingerLen = 14;
      const spread = 0.4; 
      const hoverMultiplier = mouseRef.current.x !== null ? 0.2 : 0.6;
      
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00f2fe';
      
      
      ctx.beginPath();
      ctx.moveTo(arm.wristX, arm.wristY);
      ctx.lineTo(
        arm.wristX + fingerLen * Math.cos(wristAngle - spread * hoverMultiplier),
        arm.wristY + fingerLen * Math.sin(wristAngle - spread * hoverMultiplier)
      );
      ctx.stroke();

      
      ctx.beginPath();
      ctx.moveTo(arm.wristX, arm.wristY);
      ctx.lineTo(
        arm.wristX + fingerLen * Math.cos(wristAngle + spread * hoverMultiplier),
        arm.wristY + fingerLen * Math.sin(wristAngle + spread * hoverMultiplier)
      );
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto select-none opacity-80"
    />
  );
};

export default DronesCanvas;
