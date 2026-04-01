import { useState } from "react";
import CardModal from "./CardModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition-all"
      >
        Open Card Modal
      </button>

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Payment Successful"
      >
        <p>
          Your subscription has been updated. You now have access to all premium
          features.
        </p>
      </CardModal>
    </div>
  );
}
