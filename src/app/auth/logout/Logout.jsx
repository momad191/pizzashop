import { doLogout } from "./logoutAction";
const Logout = () => {
  return (
    <form action={doLogout}>
      <button
        className="bg-black text-white p-2 m-2 rounded-md shadow w-full"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
};

export default Logout;
