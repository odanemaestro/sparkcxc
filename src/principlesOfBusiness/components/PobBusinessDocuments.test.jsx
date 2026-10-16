/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import PobBusinessDocuments from "./PobBusinessDocuments";
const KEY="spark:pob:business-documents:sample-v1";
beforeEach(()=>window.localStorage.clear());

test("updates totals and retains entries after remount",()=>{
 const view=render(<PobBusinessDocuments/>);
 expect(screen.getAllByText("J$2,910.00").length).toBeGreaterThan(0);
 fireEvent.change(screen.getByLabelText("Item 1 quantity"),{target:{value:"20"}});
 expect(screen.getAllByText("J$3,600.00").length).toBeGreaterThan(0);
 expect(window.localStorage.getItem(KEY)).toContain('"quantity":"20"');
 view.unmount();
 render(<PobBusinessDocuments/>);
 expect(screen.getByLabelText("Item 1 quantity").value).toBe("20");
});

test("does not label invalid entries as completed business documents",()=>{
 render(<PobBusinessDocuments/>);
 fireEvent.change(screen.getByLabelText("Item 1 description"),{target:{value:""}});
 fireEvent.change(screen.getByLabelText("Payment received (J$)"),{target:{value:"100"}});
 expect(screen.getByText(/Complete every item description/)).toBeInTheDocument();
 expect(screen.getByText("No receipt is issued until a payment is received.")).toBeInTheDocument();
});

test("resets the practice example without persisting customer data",()=>{
 render(<PobBusinessDocuments/>);
 fireEvent.change(screen.getByLabelText("Seller"),{target:{value:"Practice seller"}});
 fireEvent.click(screen.getByRole("button",{name:"Reset practice example"}));
 expect(screen.getByLabelText("Seller").value).toBe("Kingston School Supplies");
});
