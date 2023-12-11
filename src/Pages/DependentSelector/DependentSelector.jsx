import React, { useEffect, useState } from "react";

const DependentSelector = () => {
  const companyUnitesDepartments = [
    {
      id: 111,
      name: "company1",
      unites: [
        {
          id: 222,
          name: "unite1",
          departments: [
            {
              id: 333,
              name: "department1",
            },
            {
              id: 444,
              name: "department2",
            },
            {
              id: 555,
              name: "department3",
            },
          ],
        },
        {
          id: 666,
          name: "unite2",
          departments: [
            {
              id: 777,
              name: "department11",
            },
            {
              id: 888,
              name: "department22",
            },
            {
              id: 999,
              name: "department33",
            },
          ],
        },
      ],
    },
    {
      id: 1111,
      name: "company2",
      unites: [
        {
          id: 2222,
          name: "unite11",
          departments: [
            {
              id: 3333,
              name: "department111",
            },
            {
              id: 4444,
              name: "department222",
            },
            {
              id: 5555,
              name: "department333",
            },
          ],
        },
        {
          id: 6666,
          name: "unite22",
          departments: [
            {
              id: 7777,
              name: "department1111",
            },
            {
              id: 8888,
              name: "department2222",
            },
            {
              id: 9999,
              name: "department3333",
            },
          ],
        },
      ],
    },
  ];
  const [companies, setCompanies] = useState([]);
  const [unites, setUnites] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const companies = companyUnitesDepartments.map((company) => ({
      id: company.id,
      name: company.name,
    }));
    setCompanies(companies);

    
    
  }, []);

  return (
    <div className="text-center">
      <h5 className="text-2xl">Dependent Selector Company, Unit, Department</h5>
      <div className="flex justify-center">
        <select className="border-2 border-gray-500 rounded-md p-1 m-2">
          <option value="">Select Company</option>
          {companyUnitesDepartments.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <select className="border-2 border-gray-500 rounded-md p-1 m-2">
          <option value="">Select Unit</option>
          {companyUnitesDepartments.map((company) =>
            company.unites.map((unite) => (
              <option key={unite.id} value={unite.id}>
                {unite.name}
              </option>
            ))
          )}
        </select>
        <select className="border-2 border-gray-500 rounded-md p-1 m-2">
          <option value="">Select Department</option>
          {companyUnitesDepartments.map((company) =>
            company.unites.map((unite) =>
              unite.departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default DependentSelector;
