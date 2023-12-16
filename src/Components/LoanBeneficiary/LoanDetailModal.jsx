import { formatDate } from "../../hooks/formatDate";

const LoanDetailModal = ({ selectedLoan, onClose }) => {
  // Check if selectedLoan is null (no loan selected) and return null if it is
  if (!selectedLoan) {
    return null;
  }

  return (
    <dialog id="my_modal_1" className="modal bg-gray-800 bg-opacity-50" open>
      <div className="modal-box w-11/12 max-w-5xl rounded-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="md:col-span-3 col-span-1">
            <div className="bg-gray-100 h-[15rem] w-[15rem] rounded-full overflow-hidden items-center flex justify-center mx-auto">
              <img
                className="object-cover"
                src={selectedLoan.profile_picture}
                alt={selectedLoan.first_name + " " + selectedLoan.last_name}
              />
            </div>
            <div className="py-3"></div>
            <h2 className="text-center my-2 font-bold uppercase">
              {selectedLoan.first_name + " " + selectedLoan.last_name}
            </h2>
            {/*  */}
            {/* Loan Details */}
            <div className="ml-16 mt-5 px-5 py-5 bg-gray-100">
              <h3 className="font-bold text-lg">Loan Details</h3>
              <p>
                <span className="font-bold">Name:</span>{" "}
                {selectedLoan.first_name} {selectedLoan.last_name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {selectedLoan.email}
              </p>
              <p>
                <span className="font-bold">Date:</span>{" "}
                {formatDate(selectedLoan.created_at)}
              </p>
            </div>
            {/*  */}
          </div>
          {/* Grid 2 */}
          <div className="md:col-span-3 col-span-1">
            <h3 className="font-bold text-center mb-3 text-lg">Nid Photos</h3>
            <div className="grid grid-cols-1 overflow-hidden gap-3 w-full">
              <div className=" h-[12rem] overflow-hidden bg-gray-100 w-10/12 mx-auto">
                <img
                  className="h-full w-full object-cover"
                  src={selectedLoan.nid_front}
                  alt="Nid Front"
                />
              </div>
              <div className="h-[12rem] overflow-hidden bg-gray-100 w-10/12 mx-auto">
                <img
                  className="h-full w-full object-cover"
                  src={selectedLoan.nid_back}
                  alt="Nid Back"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button className="px-6 py-2 bg-erp_primary text-erp_light rounded-sm" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoanDetailModal;
