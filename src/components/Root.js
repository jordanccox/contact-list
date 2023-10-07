import { Outlet, useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import PropTypes from "prop-types";

export default function Root({ allContacts }) {
  const [searchParams, setSearchParams] = useSearchParams({ contacts: ""});

  const searchData = {
    contacts: searchParams.get("contacts")
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">
        <div className="row d-md-block d-block">
          <div className="nav-container col-6 col-md-3 px-0 border-end float-start">
            <div className="navbar navbar-expand navbar-expand-md bg-body-tertiary justify-content-left">
              <input
                className="m-2 input-group"
                type="search"
                placeholder="Search for a contact..."
                onChange={(event) =>
                  setSearchParams(
                    (prev) => {
                      prev.set("contacts", event.target.value);
                      return prev;
                    }
                  )
                }
              />
              <button
                className="btn btn-primary me-2 ms-md-0 ms-0"
                onClick={() => navigate("/new")}
              >
                New
              </button>
            </div>
          </div>
          <div className="col-6 col-md-9 ps-md-2 pt-2 float-end">
            <div className="row">
              <div className="col-12">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className="row d-md-block d-block">
          <div
            id="contact-list-container"
            className="col-6 col-md-3 px-0 border-end"
          >
            <ContactList allContacts={allContacts} sortedContacts={searchData.contacts}/>
          </div>
        </div>
      </div>
    </>
  );
}

Root.propTypes = {
  allContacts: PropTypes.func
};