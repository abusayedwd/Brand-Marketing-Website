import { useGetUsersQuery } from "@/redux/fetures/user/getUsers";
import Link from "next/link";
import React from "react";

const InfluencersList = () => {



  const Influencers= [
    { id: 1, name: "Madiha Qureshi", email: "madiha1@gmail.com", followers: 1200 },
    { id: 2, name: "Madiha Qureshi", email: "madiha2@gmail.com", followers: 1300 },
    { id: 3, name: "Madiha Qureshi", email: "madiha3@gmail.com", followers: 1500 },
    { id: 4, name: "Madiha Qureshi", email: "madiha4@gmail.com", followers: 1600 },
    { id: 5, name: "Madiha Qureshi", email: "madiha5@gmail.com", followers: 1700 },
    { id: 6, name: "Madiha Qureshi", email: "madiha6@gmail.com", followers: 1800 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">All Content Creator List</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">S. No</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Followers</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Influencers.map((influencer, index) => (
            <tr key={influencer.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{influencer.name}</td>
              <td className="py-2 px-4">{influencer.email}</td>
              <td className="py-2 px-4">{influencer.followers}</td>
              <td className="py-2 px-4">
                {/* <Link href={`/influencer/${influencer.id}`}> */}
                <Link href={`/dashboard/influencerDetails`}>
                
                <button className="text-blue-500 hover:text-blue-700">
                   View
                </button>
                </Link>
          
                <button className="ml-2 text-red-500 hover:text-red-700">
                  <i className="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfluencersList;
