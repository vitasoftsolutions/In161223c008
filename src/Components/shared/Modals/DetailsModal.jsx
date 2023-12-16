import { useLocation } from "react-router-dom";
import { formatDate } from "../../../hooks/formatDate";

const DetailsModal = ({ onClose, erp_modalCol, photoSection, allData, nidSection }) => {
  // console.log(allData, "from modal")
  const { pathname } = useLocation();
  const formattedPathname =
    pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2);

  if (!allData) {
    return null;
  }

  return (
    <dialog id="my_modal_1" className="modal bg-gray-800 bg-opacity-50" open>
      <div className="modal-box w-11/12 mx-auto max-w-5xl rounded-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <div className={`grid grid-cols-1 md:grid-cols-${erp_modalCol}`}>
          <div className="md:col-span-3 col-span-1">
            {photoSection && (
              <div className="bg-gray-100 h-[12rem] w-[12rem] rounded-full overflow-hidden items-center flex justify-center mx-auto">
                <img
                  className="object-cover"
                  src={allData.profile_picture || allData.logo || allData.document }
                  alt={allData.first_name + " " + allData.last_name || allData.name}
                />
              </div>
            )}

            <h2 className="text-center my-2 font-bold uppercase">
              {allData.first_name
                ? allData.first_name + " " + allData.last_name
                : allData.name
              }

              
            </h2>
            {/* Details */}
            <div className="mt-5 px-5 py-5 bg-gray-100 h-fit">
              <h3 className="font-bold text-lg pb-2 border-b mb-1">
                {formattedPathname} Details
                
              </h3>
              <ul className={`${!photoSection && 'grid grid-cols-2'}`}>
                {Object?.keys(allData)?.map(
                  (key) =>
                    key !== "id" &&
                    key !== "nid_front" &&
                    key !== "nid_back" &&
                    key !== "profile_picture" &&
                    key !== "is_deleted" &&
                    key !== "ben_id" &&
                    key !== "author_id" &&
                    key !== "employee_id" &&
                    key !== "last_login" &&
                    key !== "appointment" &&
                    key !== "documents" &&
                    key !== "is_active" &&
                    key !== "is_admin" &&
                    key !== "is_staff" &&
                    key !== "is_verified" &&
                    key !== "password" &&
                    key !== "groups" &&
                    key !== "facilities" &&
                    key !== "user_permissions" &&
                    key !== "is_superuser" &&
                    key !== "roles" &&
                    key !== "features" &&
                    key !== "logo" &&
                    key !== "document" &&
                    key !== "reciept" &&
                    key !== "status" && (
                      <li key={key}>
                        <b>
                          {" "}
                          {key
                            .replace(/_/g, " ")
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                        </b>
                        :{" "}
                        {key === "date" ||
                          key === "created_at" ||
                          key === "joined_date"
                          ? formatDate(allData[key])
                          : allData[key]}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
          {photoSection && nidSection && (
            // {/* Grid 2 */}
            <div className="md:col-span-3 col-span-1">
              {/*  */}
              <div className="grid grid-cols-1 overflow-hidden gap-3 w-full mt-10">
                <div className=" h-[12rem] overflow-hidden bg-gray-100 w-10/12 mx-auto">
                  <img
                    className="h-full w-full object-cover"
                    src={allData?.nid_front}
                    alt="Nid Front"
                  />
                </div>
                <div className="h-[12rem] overflow-hidden bg-gray-100 w-10/12 mx-auto">
                  <img
                    className="h-full w-full object-cover"
                    src={allData?.nid_back}
                    alt="Nid Back"
                  />
                </div>
              </div>
              {/*  */}
            </div>
          )}
        </div>
        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button
              className="px-6 py-2 bg-erp_primary text-erp_light rounded-sm"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DetailsModal;
