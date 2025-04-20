// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle closing the mobile menu when a navigation item is clicked
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Portofolio", path: "/portfolio" },
    { title: "Skills", path: "/skills" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "0.75rem 2rem" : "1.5rem 2rem",
        background: scrolled ? "rgba(17, 24, 39, 0.95)" : "rgba(17, 24, 39, 0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link href="/">
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #90caf9, #42a5f5, #64b5f6)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
          >
            Syafa Nur April Yanti Projeck
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {navItems.map((item, index) => (
              <Link key={index} href={item.path}>
                <div
                  style={{
                    position: "relative",
                    color: pathname === item.path ? "#90caf9" : "#d1d5db",
                    fontWeight: pathname === item.path ? "500" : "normal",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#90caf9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = pathname === item.path ? "#90caf9" : "#d1d5db";
                  }}
                >
                  {item.title}
                  {pathname === item.path && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "0",
                        width: "100%",
                        height: "2px",
                        background: "linear-gradient(45deg, #42a5f5, #90caf9)",
                        borderRadius: "2px",
                      }}
                    ></span>
                  )}
                </div>
              </Link>
            ))}
            <Link href="/contact">
              <button
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "linear-gradient(45deg, #42a5f5, #90caf9)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(144, 202, 249, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(144, 202, 249, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(144, 202, 249, 0.3)";
                }}
              >
                Hubungi Saya
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Fixed Hamburger Menu */}
        <div className="mobile-menu-container" style={{ position: "relative" }}>
          <button
            className="hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "24px",
              width: "30px",
              zIndex: 101,
            }}
          >
            <span
              style={{
                display: "block",
                height: "2px",
                width: "100%",
                backgroundColor: "#d1d5db",
                transition: "all 0.3s ease",
                transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)",
              }}
            ></span>
            <span
              style={{
                display: "block",
                height: "2px",
                width: "100%",
                backgroundColor: "#d1d5db",
                transition: "all 0.3s ease",
                opacity: isMenuOpen ? 0 : 1,
              }}
            ></span>
            <span
              style={{
                display: "block",
                height: "2px",
                width: "100%",
                backgroundColor: "#d1d5db",
                transition: "all 0.3s ease",
                transform: isMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)",
              }}
            ></span>
          </button>

          {/* Dropdown Menu */}
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              width: "200px",
              background: "rgba(17, 24, 39, 0.95)",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
              opacity: isMenuOpen ? 1 : 0,
              visibility: isMenuOpen ? "visible" : "hidden",
              transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
              transition: "all 0.3s ease",
              overflow: "hidden",
              marginTop: "10px",
              zIndex: 200,
            }}
          >
            {navItems.map((item, index) => (
              <Link key={index} href={item.path} onClick={handleNavItemClick}>
                <div
                  style={{
                    padding: "12px 20px",
                    borderLeft: pathname === item.path ? "3px solid #90caf9" : "3px solid transparent",
                    backgroundColor: pathname === item.path ? "rgba(144, 202, 249, 0.1)" : "transparent",
                    color: pathname === item.path ? "#90caf9" : "#d1d5db",
                    fontWeight: pathname === item.path ? "500" : "normal",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = "rgba(144, 202, 249, 0.05)";
                      e.currentTarget.style.color = "#90caf9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#d1d5db";
                    }
                  }}
                >
                  {item.title}
                </div>
              </Link>
            ))}
            <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <Link href="/contact" onClick={handleNavItemClick}>
                <button
                  style={{
                    padding: "8px 15px",
                    width: "100%",
                    background: "linear-gradient(45deg, #42a5f5, #90caf9)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(144, 202, 249, 0.3)",
                  }}
                >
                  Hubungi Saya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* This ensures the mobile menu is only visible on mobile devices */
        .mobile-menu-container {
          display: none;
        }
        
        /* This ensures the desktop menu is visible by default */
        .desktop-menu {
          display: flex;
        }
        
        /* Media query for mobile devices */
        @media (max-width: 767px) {
          .mobile-menu-container {
            display: block;
          }
          .desktop-menu {
            display: none;
          }
        }
        
        /* Media query for desktop devices */
        @media (min-width: 768px) {
          .mobile-menu-container {
            display: none;
          }
          .desktop-menu {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}