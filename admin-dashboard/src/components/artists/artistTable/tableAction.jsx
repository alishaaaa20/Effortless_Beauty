import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

const TableAction = ({ artistId, onStatusChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/artists/${artistId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();
      if (result.success) {
        onStatusChange(result.data);
        window.alert("Artist status updated successfully");
        window.location.reload();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to update artist status:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <Link
                  to={`/artists/${artistId}`}
                  className="dropdown-menu-link"
                >
                  View Profile
                </Link>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={() => handleStatusChange("pending")}>
                  Pending
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={() => handleStatusChange("approved")}>
                  Approved
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={() => handleStatusChange("cancelled")}>
                  Cancelled
                </button>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default TableAction;
