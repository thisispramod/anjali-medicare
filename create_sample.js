import * as XLSX from 'xlsx';

const data = [
  {
    'Name': 'Dr. Aryan Sharma',
    'Phone': '+91 9123456780',
    'Company': 'LifeCare Hospital',
    'Product Interest': 'CT Scanner High-End',
    'Lead Status': 'Hot Lead',
    'Follow-up Date': '2026-04-01',
    'Assigned Sales Person': 'Amit Singh'
  },
  {
    'Name': 'Kiran Devi',
    'Phone': '+91 9123456781',
    'Company': 'City Heart Clinic',
    'Product Interest': 'ECG-12 Channel',
    'Lead Status': 'Follow-up',
    'Follow-up Date': '2026-03-29',
    'Assigned Sales Person': 'Rajesh Kumar'
  },
  {
    'Name': 'Dr. Paulose V',
    'Phone': '+91 9123456782',
    'Company': 'Mercy Multispeciality',
    'Product Interest': 'X-Ray Mobile Unit',
    'Lead Status': 'Cold',
    'Follow-up Date': '2026-04-15',
    'Assigned Sales Person': 'Neha Sharma'
  },
  {
    'Name': 'Sarah Khan',
    'Phone': '+91 9123456783',
    'Company': 'Global Pathlabs',
    'Product Interest': 'Hematology Analyzer',
    'Lead Status': 'Closed',
    'Follow-up Date': '-',
    'Assigned Sales Person': 'Amit Singh'
  }
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Leads");

XLSX.writeFile(wb, "sample_leads.xlsx");
console.log("sample_leads.xlsx created successfully!");
