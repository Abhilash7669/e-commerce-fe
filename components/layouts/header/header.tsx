import Menu from "@/components/menu/menu";
import MenuContainer from "@/components/menu/menu-container";
import { menusServices } from "@/services/menu";

export default async function Header() {
  const data = await menusServices.getMainMenu();
  return <Menu>{data && <MenuContainer menu={data} />}</Menu>;
}
// export default function Header() {
//   const {
//     data,
//     execute,
//     error,
//     isLoading,
//     isSuccess,
//     message,
//     statusCode: myStatusCode,
//   } = useApi({
//     dataFn: async () => await menusServices.getMainMenu(),
//   });

//   useEffect(() => {
//     execute();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (isLoading) return <div>This is Loading here</div>;

//   if (error)
//     return (
//       <div>
//         Displaying error message here: {message} with status code {myStatusCode}
//       </div>
//     );

//   if (isSuccess) return <Menu>{data && <MenuContainer menu={data} />}</Menu>;
// }
