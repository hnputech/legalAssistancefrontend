import leaseimg from "../../assets/lease.png";
import buySellIcon from "../../assets/sell.png";
import employmentIcon from "../../assets/employment.png";
import loanIcon from "../../assets/loan.png";
import ndaIcon from "../../assets/nda.png";
import partnershipIcon from "../../assets/partnership.png";
import rentIcon from "../../assets/rent.png";
import demandIcon from "../../assets/demand.png";
import offerIcon from "../../assets/offer.png";
import patentIcon from "../../assets/patent.png";
import trademarkIcon from "../../assets/trademark.png";

export const cardData = {
  agreement: {
    title: "Agreements",
    description: "Create agreement content",
    data: [
      {
        icon: partnershipIcon,
        title: "Partnership Agreement",
        description: "Agreement of Partnership between 2 parties",
        type: "agreement",
        id: "partnershipagreement",
      },
      {
        icon: ndaIcon,
        title: "Non-Disclosure Agreement (NDA)",
        description: "create NDA",
        type: "agreement",
        id: "nondisclosureagreementnda",
      },
      {
        icon: employmentIcon,
        title: "Employment Contract",
        description: "An agreement of employment",
        type: "agreement",
        id: "employmentcontract",
      },
      {
        icon: leaseimg,
        title: "Lease Agreement",
        description: "description",
        type: "agreement",
        id: "leaseagreement",
      },
      {
        icon: buySellIcon,
        title: "Purchase and Sell Agreement",
        description: "A simple agreement to Purchase or sell goods",
        type: "agreement",
        id: "purchaseandsellagreement",
      },
      {
        icon: rentIcon,
        title: "Rental Agreement",
        description: "description",
        type: "agreement",
        id: "rentalagreement",
      },
      {
        icon: loanIcon,
        title: "Loan Agreement",
        description: "A loan document",
        type: "agreement",
        id: "loanagreement",
      },
    ],
  },
  letter: {
    title: "Letters",
    description: "Content for the generating letters",
    data: [
      {
        icon: offerIcon,
        title: "Offer Letter",
        description: "Offer letter for employment",
        type: "letter",
        id: "offerletter",
      },

      {
        icon: demandIcon,
        title: "Demand Letter",
        description:
          "Ask the AI to draft a demand letter to formally request payment or resolution of a dispute.",
        type: "letter",
        id: "demandletter",
      },
    ],
  },
  application: {
    title: "Applications",
    description: "Content for the generating Applications",
    data: [
      {
        icon: patentIcon,
        title: "Patent Application",
        description: "Application for registering Patent",
        type: "application",
        id: "patentapplication",
      },
      {
        icon: trademarkIcon,
        title: "Trademark Application",
        description: "Application for registering Trademark",
        type: "application",
        id: "trademarkapplication",
      },
    ],
  },
};

export const searchdaata = [
  {
    icon: leaseimg,
    title: "Partnership Agreement",
    description: "Agreement of Partnership between 2 parties",
    type: "agreement",
    id: "partnershipagreement",
  },
  {
    icon: leaseimg,
    title: "Non-Disclosure Agreement (NDA)",
    description: "create NDA",
    type: "agreement",
    id: "nondisclosureagreementnda",
  },
  {
    icon: leaseimg,
    title: "Employment Contract",
    description: "An agreement of employment",
    type: "agreement",
    id: "employmentcontract",
  },
  {
    icon: leaseimg,
    title: "Lease Agreement",
    description: "description",
    type: "agreement",
    id: "leaseagreement",
  },
  {
    icon: leaseimg,
    title: "Purchase and Sell Agreement",
    description: "A simple agreement to Purchase or sell goods",
    type: "agreement",
    id: "purchaseandsellagreement",
  },
  {
    icon: leaseimg,
    title: "Rental Agreement",
    description: "description",
    type: "agreement",
    id: "rentalagreement",
  },
  {
    icon: leaseimg,
    title: "Loan Agreement",
    description: "A loan document",
    type: "agreement",
    id: "loanagreement",
  },
  {
    icon: leaseimg,
    title: "Investment Agreement",
    description: "description",
    type: "agreement",
    id: "investmentagreement",
  },
  {
    icon: leaseimg,
    title: "Offer Letter",
    description: "Offer letter for employment",
    type: "letter",
    id: "offerletter",
  },
  {
    icon: leaseimg,
    title: "Termination Letter",
    description: "Employee Termination Letter",
    type: "letter",
    id: "terminationletter",
  },
  {
    icon: leaseimg,
    title: "Warning Letter",
    description: "Employee Warning Letter",
    type: "letter",
    id: "warningletter",
  },
  {
    icon: leaseimg,
    title: "Demand Letter",
    description:
      "Ask the AI to draft a demand letter to formally request payment or resolution of a dispute.",
    type: "letter",
    id: "demandletter",
  },
  {
    icon: leaseimg,
    title: "Patent Application",
    description: "Application for registering Patent",
    type: "application",
    id: "patentapplication",
  },
  {
    icon: leaseimg,
    title: "Trademark Application",
    description: "Application for registering Trademark",
    type: "application",
    id: "trademarkapplication",
  },
];
