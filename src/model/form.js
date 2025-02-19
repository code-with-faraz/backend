import mongoose from "mongoose";
const formSchema = new mongoose.Schema({
  Step1: { name: { type: String, required: true } },
  Step2: { details: { type: String, required: true } },
  Step3: { type: { type: String, required: true } }, 
  Step4: { industry: { type: String, required: true } },
  Step5: { loan: { type: String, required: true } },
  Step6: {
    "Rented Building": { type: Number, default: 0 },
    Salary: { type: Number, default: 0 },
    "Purchase of consumables/ spare parts": { type: Number, default: 0 },
    "Stationary expenses": { type: Number, default: 0 },
    "Electricity/water expense": { type: Number, default: 0 },
    "Repair and maintenance charges": { type: Number, default: 0 },
    "Transportation cost": { type: Number, default: 0 },
    "Telephone/postal & internet charge": { type: Number, default: 0 },
    "Marketing & advertising cost": { type: Number, default: 0 },
  },
  Step7: { business: { type: String, required: true } },
  Step8: {
    Land: { type: Number, default: 0 },
    "Shed/building": { type: Number, default: 0 },
    Machinery: { type: Number, default: 0 },
    "Computers/printers/photocopier/other electronic gadgets,etc.": { type: Number, default: 0 },
    "Furniture & fixtures": { type: Number, default: 0 },
    "Electrification & electricity backup": { type: Number, default: 0 },
    "Racks & storage": { type: Number, default: 0 },
    Vehicle: { type: Number, default: 0 },
    "Other initial expenditure": { type: Number, default: 0 },
    "Software purchase": { type: Number, default: 0 },
  },
  Step9: {
    education: { type: String, required: true },
    year: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    society: { type: String, required: true },
  },
  Step10: {
    locality: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    registration: { type: String, required: true },
  },
});
const FormModel = mongoose.model("Form", formSchema);
export default FormModel;
