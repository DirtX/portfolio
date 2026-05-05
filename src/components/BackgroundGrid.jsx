import { useEffect, useState } from 'react';
import './BackgroundGrid.css';

export default function BackgroundGrid() {
  const [gridConfig, setGridConfig] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.floor(window.innerWidth / 50) + 1;
      const rows = Math.floor(window.innerHeight / 50) + 1;
      setGridConfig({ columns, rows });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const col = Math.floor(e.clientX / 50);
      const row = Math.floor(e.clientY / 50);
      const index = row * gridConfig.columns + col;
      
      const cell = document.getElementById(`cell-${index}`);
      if (cell) {
        cell.classList.add('active');
        setTimeout(() => {
          cell.classList.remove('active');
        }, 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gridConfig]);

  const totalCells = gridConfig.columns * gridConfig.rows;

  return (
    <div 
      className="bg-grid-container" 
      style={{ gridTemplateColumns: `repeat(${gridConfig.columns}, 50px)` }}
    >
      {Array.from({ length: totalCells }).map((_, index) => (
        <div key={index} id={`cell-${index}`} className="bg-grid-cell" />
      ))}
    </div>
  );
}