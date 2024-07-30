import { useState } from "react";

import { BasicCard } from "../card";
import { CardContainer } from "../card/CardContainer";
import { FilterCard } from "../card/Filtercard";
import { cardData, searchdaata } from "./const";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Template = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

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
        flexDirection: "column",
        height: isMobile ? "100vh" : "calc(100vh - 64px)",
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
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          zIndex: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          {search && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                width: "100%",
              }}
            >
              {searchdaata
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <BasicCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    type={item.type}
                  />
                ))}
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
    </div>
  );
};
