(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const a={currentDate:document.querySelector(".current-date"),currentList:document.querySelector(".current-list"),todoFormDiv:document.querySelector(".todo-form"),todoForm:document.querySelector(".todo-form form"),addTodo:document.querySelector(".add-todo"),addList:document.querySelector(".add-project"),listFormDiv:document.querySelector(".list-form"),listForm:document.querySelector(".list-form form"),listFormInput:document.querySelector("#list"),todosWrapper:document.querySelector(".todos"),listsWrapper:document.querySelector("#lists"),todoCount:document.querySelector(".how-many"),listDropdown:document.querySelector("#list-dropdown")},y=d=>d.replace(/-/g," "),g=d=>d.replace(/\s+/g,"-"),T=d=>d.dataset.name;class b{constructor(t){this.todos=t}toggleTodoForm(t){t.offsetParent?t.style.display="none":t.style.display="block"}disabled(t,e){t.style.borderBottom="",e.disabled=!0}enabled(t,e){t.style.borderBottom="2px solid black",e.disabled=!1}toggleEdit(t){const e=t.target.closest(".todo"),r=e.children[0].children,n=e.children[1].children[0],o=[].slice.call(r);o.push(n),o.forEach(s=>{s.disabled?this.enabled(e.children[0],s):this.disabled(e.children[0],s)})}renderTodos(t,e,r){t.innerHTML="";const n=e(r);for(let o=0;o<n.length;o++){const s=document.createElement("div");s.classList.add("todo"),s.setAttribute("id",n[o].id);const i=document.createElement("div");i.classList.add("text");const l=document.createElement("div");l.classList.add("completion");const u=document.createElement("input");u.setAttribute("id","todo-title");const c=document.createElement("input");c.setAttribute("id","todo-date");const m=document.createElement("input");m.setAttribute("id","done");const L=document.createElement("i");L.classList.add("edit","fa-solid","fa-pen-to-square");const h=document.createElement("button");h.classList.add("delete");const f=document.createElement("i");f.classList.add("fa-solid","fa-trash"),u.setAttribute("type","text"),u.setAttribute("name","todo-title"),u.setAttribute("value",n[o].title),u.setAttribute("disabled",!0),c.setAttribute("type","date"),c.setAttribute("name","todo-date"),c.value=n[o].due,c.setAttribute("required",!0),c.setAttribute("disabled",!0),m.setAttribute("type","checkbox"),m.setAttribute("name","done"),m.setAttribute("disabled",!0),m.checked=n[o].completed,h.appendChild(f),i.appendChild(u),i.appendChild(c),l.appendChild(m),l.appendChild(L),l.appendChild(h),s.appendChild(i),s.appendChild(l),t.appendChild(s)}}resetTitleAndDate(t){t[0].value="",t[1].value=""}updateTodoListCount(t,e){document.querySelector(`[data-name='${e}'] .how-many`).textContent=t(e)}updateTodoFormListSelection(t){const e=g(t);document.querySelector(`option[value='${e}']`).selected=!0}updateTodoListTitle(t){a.currentList.dataset.name=g(t),a.currentList.textContent=t}handleTodoFormToggle(t){a.addTodo.addEventListener("click",()=>{a.listFormDiv.style.display!=="block"&&this.toggleTodoForm(a.todoFormDiv)})}handleTodoEdit(t){document.addEventListener("click",e=>{e.target.closest(".edit")&&this.toggleEdit(e)})}}let v=(d=21)=>crypto.getRandomValues(new Uint8Array(d)).reduce((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_","");class S{constructor(t){this.todos={All:[]}}removeList(t){delete this.todos[t],this.pushToLocalStorage()}localIsEmpty(){return localStorage.getItem("todos")===null}clearLocalStorage(){return localStorage.clear()}setDataFromLocal(t){this.todos=JSON.parse(t)}pushToLocalStorage(){localStorage.setItem("todos",JSON.stringify(this.todos))}getTodosFromLocalStorage(t){const e=localStorage.getItem("todos");this.localIsEmpty()?t.innerHTML="":this.setDataFromLocal(e)}}const p=new S;class E{constructor(){this.storage=p}delete(t,e){const r=g(e),n=this.storage.todos[r].findIndex(o=>o.id===t);this.storage.todos[r].splice(n,1),p.pushToLocalStorage()}updateEdit(t,e,r,n,o){const s=g(e);for(let i=0;i<this.storage.todos[s].length;i++)this.storage.todos[s][i].id===t&&(this.storage.todos[s][i].title=r,this.storage.todos[s][i].due=n,this.storage.todos[s][i].completed=o);p.pushToLocalStorage()}getUpdatedValues(t,e,r){e(t);const n=r.id,o=r.parentElement.previousElementSibling.textContent,s=r.children[0].children[0].value,i=r.children[0].children[1].value,l=r.children[1].children[0].checked;this.updateEdit(n,o,s,i,l)}saveData(t){const e=t.get("list");let r={id:v(),title:t.get("title"),due:t.get("due"),completed:!1};return this.storage.todos[e].push(r),this.storage.pushToLocalStorage(),r}getTodos(t){return this.storage.todos[t]}getTodoListLength(t){return this.storage.todos[t].length}}class C{constructor(t){this.lists=t}toggleListForm(t){t.offsetParent?t.style.display="none":t.style.display="block"}renderLists(t,e,r){const n=e();t.innerHTML="";for(let o=0;o<n.length;o++){let s=n[o],i=y(s);const l=document.createElement("div");l.dataset.name=s,l.classList.add("list");const u=document.createElement("p");u.classList.add("list-name");const c=document.createElement("p");c.classList.add("how-many"),c.textContent=r.todos[n[o]].length;const m=document.createElement("i");m.classList.add("list-del","fa-solid","fa-trash"),u.textContent=i,l.appendChild(u),l.appendChild(c),l.appendChild(m),t.appendChild(l)}}noListName(t){return t===""}getListName(){return a.listFormInput.value}updateListCount(t){document.querySelectorAll(".list").forEach(e=>{const r=e.children[1];r.textContent=t.todos[e.dataset.name].length})}createListSelection(t,e){const r=document.createElement("option"),n=g(t);r.setAttribute("value",n),r.textContent=t,e.appendChild(r)}handleListFormToggle(t){a.addList.addEventListener("click",()=>{a.todoFormDiv.style.display!=="block"&&this.toggleListForm(a.listFormDiv)})}}class F{constructor(){this.storage=p}addListToStorage(t){const e=g(t);this.storage.todos[e]=[],this.storage.pushToLocalStorage()}getLists(){return Object.keys(this.storage.todos)}delete(t){document.querySelector(`[data-name='${t}']`).remove(),p.removeList(t)}edit(){}}document.addEventListener("DOMContentLoaded",()=>{const t=new Date().toString().split(" ").slice(0,4).join(" ");a.currentDate.textContent=t,p.getTodosFromLocalStorage(a.todosWrapper)});const A=()=>{const d=new C,t=new F;d.handleListFormToggle(),a.listForm.addEventListener("submit",e=>{e.preventDefault();const{listForm:r,listFormInput:n,listFormDiv:o,listsWrapper:s,listDropdown:i}=a,l=d.getListName(n);d.noListName(l)||(t.addListToStorage(l),d.toggleListForm(o),d.renderLists(s,t.getLists.bind(t),p),d.createListSelection(l,i),r.reset())}),document.addEventListener("click",e=>{const r=e.target.closest(".list-del");if(!(r&&r.parentElement.dataset.name==="All")&&r){const n=r.parentElement,o=T(n);t.delete(o)}}),document.addEventListener("DOMContentLoaded",()=>{d.renderLists(a.listsWrapper,t.getLists.bind(t),p),t.getLists().forEach(r=>{d.createListSelection(r,a.listDropdown)})})};A();const D=()=>{const d=new b,t=new E,{todoForm:e,todoFormDiv:r,todosWrapper:n}=a;d.handleTodoFormToggle(),e.addEventListener("submit",o=>{o.preventDefault();const s=new FormData(e);if(s.get("title")==="")return;t.saveData(s);const i=s.get("list");d.toggleTodoForm(r),d.renderTodos(n,t.getTodos.bind(t),i),d.updateTodoListCount(t.getTodoListLength.bind(t),i),d.resetTitleAndDate(e)}),document.addEventListener("click",o=>{if(o.target.closest(".edit")){const s=o.target.closest(".todo");s.children[0].children[0].disabled?d.toggleEdit(o):t.getUpdatedValues(o,d.toggleEdit.bind(d),s)}}),document.addEventListener("click",o=>{if(o.target.closest(".delete")){const s=o.target.closest(".todo"),i=s.id,l=s.parentElement.previousElementSibling.dataset.name;t.delete(i,l),d.renderTodos(a.todosWrapper,t.getTodos.bind(t),l),d.updateTodoListCount(t.getTodoListLength.bind(t),l)}}),document.addEventListener("click",o=>{if(o.target.closest(".list-name")){const s=o.target.textContent,i=g(s);d.updateTodoFormListSelection(s),d.updateTodoListTitle(s),d.renderTodos(a.todosWrapper,t.getTodos.bind(t),i)}}),document.addEventListener("click",o=>{if(o.target.closest("option")){const s=o.target.closest("option").value,i=g(s);d.updateTodoListTitle(s),d.renderTodos(a.todosWrapper,t.getTodos.bind(t),i)}}),document.addEventListener("DOMContentLoaded",()=>{d.renderTodos(a.todosWrapper,t.getTodos.bind(t),"All"),d.updateTodoListTitle("All")})};D();
