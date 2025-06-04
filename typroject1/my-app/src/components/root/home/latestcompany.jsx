import React, { useState, useEffect } from 'react';
import './latestcompanies.css'; // Import the CSS file

function FilterableCompanyList({ companies }) {
  const [filterText, setFilterText] = useState('');
  const [onlyPune, setOnlyPune] = useState(false);

  return (
    <div className="filterable-company-list">
      <SearchBar
        filterText={filterText}
        onlyPune={onlyPune}
        onFilterTextChange={setFilterText}
        onOnlyPuneChange={setOnlyPune}
      />
      <CompanyList
        companies={companies}
        filterText={filterText}
        onlyPune={onlyPune}
      />
    </div>
  );
}

function CompanyBox({ company }) {
  return (
    <div className="company-box">
      <h3>{company.company_name}</h3>
      <p><strong>Stipend:</strong> {company.stipend}</p>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Schedule Date:</strong> {company.schedule_date}</p>
    </div>
  );
}

function CompanyList({ companies, filterText, onlyPune }) {
  const filteredCompanies = companies
    .filter((company) => {
      if (filterText && !company.company_name.toLowerCase().includes(filterText.toLowerCase())) {
        return false;
      }
      if (onlyPune && company.location.toLowerCase() !== 'pune') {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(a.schedule_date) - new Date(b.schedule_date));

  return (
    <div className="company-list">
      {filteredCompanies.map((company) => (
        <CompanyBox company={company} key={company.company_id} />
      ))}
    </div>
  );
}

function SearchBar({ filterText, onlyPune, onFilterTextChange, onOnlyPuneChange }) {
  return (
    <form className="search-bar">
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        className="form-control"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={onlyPune}
          onChange={(e) => onOnlyPuneChange(e.target.checked)}
        />
        {' '}
        Only show Pune companies
      </label>
    </form>
  );
}

function Latestcompany() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tnpbackend/companies')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

  return <FilterableCompanyList companies={companies} />;
}

export default Latestcompany;
