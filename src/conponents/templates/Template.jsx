import React, { useState } from "react";
import { BasicCard } from "../card";
import leaseimg from "../../assets/lease.png";
import { CardContainer } from "../card/CardContainer";
import { FilterCard } from "../card/Filtercard";

export const cardData = {
  agreement: {
    title: "Agreements",
    description: "Create agreement content",
    data: [
      {
        icon: leaseimg,
        title: "Partnership Agreement",
        description: "Agreement of Partnership between 2 parties",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Non-Disclosure Agreement (NDA)",
        description: "create  NDA",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Employment Contract",
        description: "An agreement of employment",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Lease Agreement",
        description: "description",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Purchase and Sell Agreement",
        description: "A simple agreement to Purchase or sell goods",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Rental Agreement",
        description: "description",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Loan Agreement",
        description: "A loan document",
        type: "agreement",
      },
      {
        icon: leaseimg,
        title: "Investment Agreement",
        description: "description",
        type: "agreement",
      },
    ],
  },
  letter: {
    title: "Letters",
    description: "Content for the generating letters",
    data: [
      {
        icon: leaseimg,
        title: "Offer Letter",
        description: "Offer letter for employment ",
        type: "letter",
      },
      {
        icon: leaseimg,
        title: "Termination Letter",
        description: "Employee Termination Letter",
        type: "letter",
      },
      {
        icon: leaseimg,
        title: "Warning Letter",
        description: "Employee Warning Letter",
        type: "letter",
      },
      {
        icon: leaseimg,
        title: "Demand Letter",
        description:
          "Ask the AI to draft a demand letter to formally request payment or resolution of a dispute.",
        type: "letter",
      },
    ],
  },
  application: {
    title: "Applications",
    description: "Content for the generating Applications",
    data: [
      {
        icon: leaseimg,
        title: "Patent Application",
        description: "Application for registering Patent ",
        type: "Application",
      },
      {
        icon: leaseimg,
        title: "Trademark Application",
        description: "application for registering Trademark ",
        type: "Application",
      },
    ],
  },
};

const searchdaata = [
  {
    icon: leaseimg,
    title: "Partnership Agreement",
    description: "Agreement of Partnership between 2 parties",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Non-Disclosure Agreement (NDA)",
    description: "create  NDA",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Employment Contract",
    description: "An agreement of employment",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Lease Agreement",
    description: "description",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Purchase and Sell Agreement",
    description: "A simple agreement to Purchase or sell goods",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Rental Agreement",
    description: "description",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Loan Agreement",
    description: "A loan document",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Investment Agreement",
    description: "description",
    type: "agreement",
  },
  {
    icon: leaseimg,
    title: "Offer Letter",
    description: "Offer letter for employment ",
    type: "letter",
  },
  {
    icon: leaseimg,
    title: "Termination Letter",
    description: "Employee Termination Letter",
    type: "letter",
  },
  {
    icon: leaseimg,
    title: "Warning Letter",
    description: "Employee Warning Letter",
    type: "letter",
  },
  {
    icon: leaseimg,
    title: "Demand Letter",
    description:
      "Ask the AI to draft a demand letter to formally request payment or resolution of a dispute.",
    type: "letter",
  },
  {
    icon: leaseimg,
    title: "Patent Application",
    description: "Application for registering Patent ",
    type: "Application",
  },
  {
    icon: leaseimg,
    title: "Trademark Application",
    description: "application for registering Trademark ",
    type: "Application",
  },
];

export const Template = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleUpdateFilter = (updatedFilter) => {
    setSearch("");
    setFilter(updatedFilter);
  };

  const handleUpdateSearch = (updatedSearch) => {
    setFilter("");
    setSearch(updatedSearch);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "auto",
        height: "100vh",
      }}
    >
      <FilterCard
        title=" Legal DocumentTemplates"
        description="Our team have build pre-defined legal templates for you to generate your law content within few seconds"
        filter={filter}
        handleUpdateFilter={handleUpdateFilter}
        search={search}
        handleUpdateSearch={handleUpdateSearch}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          color: "rgba(0, 0, 0, 0.87)",
          height: "100vh",
          overflowY: "auto",
          width: "auto",
        }}
      >
        {search && (
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {searchdaata
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => {
                  return (
                    <BasicCard
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      type={item.type}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {!search &&
          Object.keys(cardData)
            .filter((item) => {
              if (!filter) {
                return item;
              }
              return item === filter;
            })
            .map((key) => <CardContainer key={key} {...cardData[key]} />)}
      </div>
    </div>
  );
};
