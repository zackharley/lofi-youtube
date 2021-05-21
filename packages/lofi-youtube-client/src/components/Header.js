import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h2>
        <Link to="/" className="logo">LoFi YouTube</Link>
      </h2>
    </header>
  );
}
