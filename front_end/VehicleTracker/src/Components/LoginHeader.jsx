import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    
  return (
    <header className="bg-primary text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <h4 className="mb-0">🚗 Vehicle Tracking System</h4>
        <nav>
          <a href="#" className="text-white me-3 text-decoration-none">Home</a>
          <a href="#" className="text-white me-3 text-decoration-none">Features</a>
          <a href="#" className="text-white text-decoration-none">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

