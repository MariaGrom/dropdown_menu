import IconShareBtn from "../../assets/icons/share_btn.svg";
import IconEditBtn from "../../assets/icons/edit_btn.svg";
import IconDeleteBtn from "../../assets/icons/delete_btn.svg";

export const DropdownItemInfo = [
  {
    id: 11,
    title: "Поделиться в социальных сетях",
    scrIcon: IconShareBtn,
    alt: "share",
    onClick: () => {
      console.log("поделиться в соц сетях");
    },
  },
  {
    id: 12,
    title: "Редактировать страницу",
    scrIcon: IconEditBtn,
    alt: "edit",
    onClick: () => {
      console.log("редактировать инфу");
    },
  },
  {
    id: 13,
    title: "Удалить страницу",
    scrIcon: IconDeleteBtn,
    alt: "delete",
    onClick: () => {
      console.log("удалить контент");
    },
  },
];
