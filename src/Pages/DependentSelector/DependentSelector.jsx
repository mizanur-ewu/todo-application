import React, { useEffect, useState } from "react";

const DependentSelector = () => {
  const companyUnitesDepartments = [
    {
      id: 1,
      name: "company1",
      unites: [
        {
          id: 11,
          name: "unite11",
          departments: [
            {
              id: 111,
              name: "department111",
            },
            {
              id: 112,
              name: "department112",
            },
            {
              id: 113,
              name: "department113",
            },
          ],
        },
        {
          id: 12,
          name: "unite12",
          departments: [
            {
              id: 121,
              name: "department121",
            },
            {
              id: 122,
              name: "department122",
            },
            {
              id: 123,
              name: "department123",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "company2",
      unites: [
        {
          id: 21,
          name: "unite21",
          departments: [
            {
              id: 211,
              name: "department211",
            },
            {
              id: 212,
              name: "department212",
            },
            {
              id: 213,
              name: "department213",
            },
          ],
        },
        {
          id: 22,
          name: "unite22",
          departments: [
            {
              id: 221,
              name: "department221",
            },
            {
              id: 222,
              name: "department222",
            },
            {
              id: 223,
              name: "department223",
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
    handleChange();
  }, []);

  const handleChange = (
    field = "company",
    value = companyUnitesDepartments[0]?.id
  ) => {
    if (field === "company") {
      const selectedCompany = companyUnitesDepartments.find((company) => {
        if (company?.id === Number(value)) {
          setCompanies(company);
          return company;
        }
      });
      setUnites(selectedCompany?.unites);

      setDepartments(selectedCompany?.unites[0].departments);
    }
    // console.log(companies?.unites);
    if (field === "unit") {
      const selectedUnites = unites.find((unite) => {
        if (unite?.id === Number(value)) {
          return unite;
        }
      });
      setDepartments(selectedUnites?.departments);
    }
  };

  return (
    <div className="text-center">
      <h5 className="text-2xl">Dependent Selector Company, Unit, Department</h5>
      <div className="flex justify-center">
        <select
          className="border-2 border-gray-500 rounded-md p-1 m-2"
          onChange={(e) => handleChange("company", e.target.value)}
        >
          {companyUnitesDepartments?.map((company) => (
            <option key={company?.id} value={company?.id}>
              {company.name}
            </option>
          ))}
        </select>
        <select
          className="border-2 border-gray-500 rounded-md p-1 m-2"
          onChange={(e) => handleChange("unit", e.target.value)}
        >
          {unites.map((unite) => (
            <option key={unite?.id} value={unite.id}>
              {unite?.name}{" "}
            </option>
          ))}
        </select>
        <select
          className="border-2 border-gray-500 rounded-md p-1 m-2"
          onChange={(e) => handleChange("department", e.target.value)}
        >
          {departments?.map((department) => (
            <option key={department?.id} value={department.id}>
              {department?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DependentSelector;
