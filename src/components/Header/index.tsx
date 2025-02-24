import { JSX, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { useLogoutMutation } from "src/api/apiSlice";
import { SkeletonLoader } from "../SkeletonLoader";
import { FIREBASE_AUTH, GlobalContext } from "src/root";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const [isOpenedUserMenu, setIsOpenedUserMenu] = useState(false);

  const [loading, setLoading] = useState(true);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const userBtnRef = useRef<HTMLDivElement | null>(null);

  const logoutBtnRef = useRef<HTMLDivElement | null>(null);

  const [logout] = useLogoutMutation();

  const currentPage = location.pathname;

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  useEffect(() => {
    if (!loading && !currentUser) navigate(routes.start);
  }, [currentUser, loading, navigate]);

  useEffect(() => {
    const handleClickOutsideMenu = ({ target }: MouseEvent) => {
      if (
        target !== menuRef.current &&
        target !== userBtnRef.current &&
        target !== logoutBtnRef.current
      )
        setIsOpenedUserMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, [setIsOpenedUserMenu]);

  return (
    <header className="flex sticky top-0 z-10 flex-row justify-between items-center py-2 px-6 min-h-[80px] bg-orange-400">
      <div className="flex flex-row items-center sm:h-[40px]">
        <h1 className="text-2xl sm:text-4xl text-white sm:h-full">Fit form</h1>

        <div className="flex flex-row ms-3 sm:ms-5 h-full mt-1 sm:mt-2">
          <div
            onClick={() => navigate(routes.main)}
            className={`${
              currentPage === routes.main ? "underline" : ""
            } cursor-pointer hover:underline text-white text-lg sm:text-xl mx-4 flex items-center`}
          >
            Main
          </div>
          <div
            onClick={() => navigate(routes.myPlan)}
            className={`${
              currentPage === routes.myPlan ? "underline" : ""
            } cursor-pointer hover:underline text-white text-lg sm:text-xl mx-4 flex items-center`}
          >
            My plan
          </div>
        </div>
      </div>

      <div className="bg-white rounded-full cursor-pointer hover:scale-125 duration-300">
        {!currentUser ? (
          <SkeletonLoader className="rounded-full w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]" />
        ) : (
          <div
            data-testid="user-btn"
            ref={userBtnRef}
            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center"
            onClick={() => setIsOpenedUserMenu((prev) => !prev)}
          >
            {currentUser.email?.[0].toLocaleUpperCase()}
          </div>
        )}
      </div>

      {isOpenedUserMenu && (
        <menu
          ref={menuRef}
          className="flex flex-col items-center justify-between p-3 bg-white w-[180px] h-[100px] fixed right-[32px] top-[75px] rounded shadow-md outline-black outline/10"
        >
          <p className="text-gray-500">{currentUser?.email}</p>
          <div
            data-testid="logout-btn"
            ref={logoutBtnRef}
            onClick={(e) => {
              e.stopPropagation();
              logout();
              navigate(routes.start);
            }}
            className="flex items-center justify-center hover:scale-105 duration-300 cursor-pointer bg-orange-400 text-white w-[75%] h-[40px] p-3 rounded-md"
          >
            Logout
          </div>
        </menu>
      )}
    </header>
  );
};
