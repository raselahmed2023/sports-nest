import SportsCard from "../../components/SportsCard";


const AllFacilities = async () => {

    const res = await fetch("http://localhost:8000/facilities", {
        cache: "no-store",
    });

    const facilities = await res.json();

    return (
        <div className="min-h-screen bg-base-200 px-16 py-12">

            <h1 className="text-2xl font-bold mb-8 text-center">
                All Facilities
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {facilities.map((facility) => (
                    <SportsCard
                        key={facility._id}
                        facility={facility}
                    />
                ))}

            </div>

        </div>
    );
};

export default AllFacilities;