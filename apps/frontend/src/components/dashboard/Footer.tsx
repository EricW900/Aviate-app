const Footer = () => {
  return (
    <footer className="border-t border-aviation-blue/15 bg-white/70 px-6 py-3 text-sm text-aviation-muted">
      © {new Date().getFullYear()} AVIATE. All rights reserved.
    </footer>
  );
};

export default Footer;