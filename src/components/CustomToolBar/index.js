import React from 'react';
import { Navigate } from 'react-big-calendar';

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    toolbar.onNavigate(Navigate.NEXT);
  };

  const goToCurrent = () => {
    toolbar.onNavigate(Navigate.TODAY);
  };

  const label = () => {
    return (
      <span><b>{toolbar.label}</b></span>
    );
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>&#8249;</button>
        <button type="button" onClick={goToCurrent}>Today</button>
        <button type="button" onClick={goToNext}>&#8250;</button>
      </span>
      <span className="rbc-toolbar-label">{label()}</span>
      <span className="rbc-btn-group" style={{ display: 'none' }}>
        {/* This is where the view buttons would normally be, but we're hiding them */}
      </span>
    </div>
  );
};

export default CustomToolbar;
