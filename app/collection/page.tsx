import { UserCollection } from "@/components/user-collection";

const CollectionPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <UserCollection />
      </div>
    </main>
  );
};

export default CollectionPage;
