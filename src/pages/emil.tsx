import * as React from "react";
import Header from "../components/header";
function Emil(): JSX.Element {
  return (
    <div>
      <Header />
      <main className="container flex flex-col">
        <h2 className="text-2xl">Acomplishments</h2>
        <div className="">
          <h4 className="text-xl">Cloud-Native Microsoft Graph Integration</h4>
          <li>
            Event based synchronization between On-Prem CRM and SharePoint using
            Microsoft Graph, Event Store and .NET 5
          </li>
          <li>
            Kept customer information, files and task management in
            synchronization while being used in both systems.
          </li>
          <p>
            I build an integration service with the purpose of synchronizing and
            converting data transferred from an On-Prem SQL CRM to SharePoint.
            The transfer was done by .NET 6 services listening to events from
            several source systems, converting and transferring data.
          </p>
        </div>
        <div>
          <h4 className="text-xl">
            CQRS Event Sourcing Accounting Core System
          </h4>
          <li> </li>
          <p></p>
        </div>
        <div>
          <h4 className="text-xl">CI/CD Setup in Azure DevOps</h4>
        </div>
        <div>
          <h4 className="text-xl">APM setup using Elastic, Kibana and Beats</h4>
        </div>
      </main>
    </div>
  );
}
export default Emil;
