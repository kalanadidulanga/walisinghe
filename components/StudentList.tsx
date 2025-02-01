import React from 'react';

const StudentList: React.FC = () => {
  const students = [
    {
      name: 'Didul Adeesha',
      grade: '10',
      class: 'A',
      indexNo: '25066',
      dob: '2005/08/21',
      guardianName: 'Kalana Didulanga',
      phoneNumber: '+33757005467',
      gender: 'Male',
    },
    // Add more students as needed
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Student List</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Student</button>
      </div>
      <div className="flex space-x-4 mb-4">
        <select className="border p-2 rounded">
          <option>All</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <select className="border p-2 rounded">
          <option>All</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <select className="border p-2 rounded">
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Student Name</th>
            <th className="border border-gray-300 p-2">Grade</th>
            <th className="border border-gray-300 p-2">Class</th>
            <th className="border border-gray-300 p-2">Index No.</th>
            <th className="border border-gray-300 p-2">Date of Birth</th>
            <th className="border border-gray-300 p-2">Guardian's Name</th>
            <th className="border border-gray-300 p-2">Phone number</th>
            <th className="border border-gray-300 p-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.grade}</td>
              <td className="border border-gray-300 p-2">{student.class}</td>
              <td className="border border-gray-300 p-2">{student.indexNo}</td>
              <td className="border border-gray-300 p-2">{student.dob}</td>
              <td className="border border-gray-300 p-2">{student.guardianName}</td>
              <td className="border border-gray-300 p-2">{student.phoneNumber}</td>
              <td className="border border-gray-300 p-2">{student.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;