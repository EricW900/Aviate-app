interface Props {
  message: string;
  type: "success" | "error";
}

const Alert = ({ message, type }: Props) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        flex w-full max-w-sm overflow-hidden
        bg-white rounded-lg shadow-md
        fixed top-5 right-5 z-50
      `}
    >
      <div
        className={`
          flex items-center justify-center w-12
          ${isSuccess ? "bg-emerald-500" : "bg-red-500"}
        `}
      >
        <span className="text-white font-bold">
          !
        </span>
      </div>

      <div className="px-4 py-3">
        <p
          className={`
            font-semibold
            ${
              isSuccess
                ? "text-emerald-500"
                : "text-red-500"
            }
          `}
        >
          {isSuccess ? "Success" : "Error"}
        </p>

        <p className="text-sm text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Alert;