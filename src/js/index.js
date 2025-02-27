// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [V] 메뉴 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
// - [V] 메뉴 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [V] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [V] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [V] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [V] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [V] 메뉴의 수정 버튼을 누르면 prompt 창이 뜬다.
// - [V] prompt 창에서 수정할 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [V] 메뉴 삭제 버튼을 누르면 confirm 창이 뜬다.
// - [V] 확인을 누르면 메뉴가 삭제된다.
// - [V] 총 메뉴 갯수를 count하여 상단에 보여준다.
const $ = (selector) => document.querySelector(selector);

function App() {
  const countMenu = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
    countMenu();
    $("#espresso-menu-name").value = "";
  };

  const editMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = prompt(
      "수정할 메뉴명을 입력해주세요.",
      $menuName.innerText
    );
    if (newMenuName === "") {
      alert("값을 입력해주세요.");
      return;
    }
    $menuName.innerText = newMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      countMenu();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      editMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그가 자동으로 전송하는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
