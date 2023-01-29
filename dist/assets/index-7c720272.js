(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const a={showNav:document.querySelector(".show-nav"),hideNav:document.querySelector(".hide-nav"),sidebar:document.querySelector("#sidebar"),currentDate:document.querySelector(".current-date"),currentList:document.querySelector(".current-list"),todoFormDiv:document.querySelector(".todo-form"),todoForm:document.querySelector(".todo-form form"),addTodo:document.querySelector(".add-todo"),addList:document.querySelector(".add-project"),listFormDiv:document.querySelector(".list-form"),listForm:document.querySelector(".list-form form"),listFormInput:document.querySelector("#list"),listClose:document.querySelector(".list-form-cancel"),todoClose:document.querySelector(".todo-form-cancel"),todosWrapper:document.querySelector(".todos"),listsWrapper:document.querySelector("#lists"),todoCount:document.querySelector(".how-many"),listDropdown:document.querySelector("#list-dropdown")},E=n=>n.replace(/-/g," "),v=n=>n.replace(/\s+/g,"-"),F=n=>n.dataset.name,D=n=>{const t=n;t.style.display="block"},A=n=>{const t=n;t.style.display="none"},k=n=>{n.forEach(e=>{e.disabled=!1,e.style.color="var(--accent-color)"})},x=n=>{n.forEach(e=>{e.disabled=!0,e.style.color="var(--tertiary-color)"})},L=(n,t,e="All")=>{const o=n;o.innerHTML="";const s=t;for(let r=0;r<s.length;r+=1){const d=document.createElement("div");d.classList.add("todo"),d.setAttribute("id",s[r].id),d.dataset.name=e;const l=document.createElement("div");l.classList.add("text");const c=document.createElement("div");c.classList.add("completion");const u=document.createElement("input");u.setAttribute("id","todo-title");const m=document.createElement("input");m.setAttribute("id","todo-date");const p=document.createElement("input");p.setAttribute("id","done");const g=document.createElement("i");g.classList.add("edit","fa-solid","fa-pen-to-square");const f=document.createElement("button");f.classList.add("delete");const S=document.createElement("i");S.classList.add("fa-solid","fa-trash"),u.setAttribute("type","text"),u.setAttribute("name","todo-title"),u.setAttribute("value",s[r].title),u.setAttribute("disabled",!0),m.setAttribute("type","date"),m.setAttribute("name","todo-date"),m.value=s[r].due,m.setAttribute("required",!0),m.setAttribute("disabled",!0),p.setAttribute("type","checkbox"),p.setAttribute("name","done"),p.setAttribute("disabled",!0),p.checked=s[r].completed,f.appendChild(S),l.appendChild(u),l.appendChild(m),c.appendChild(p),c.appendChild(g),c.appendChild(f),d.appendChild(l),d.appendChild(c),n.appendChild(d)}},N=n=>{const t=n[0],e=n[1];t.value="",e.value=""},O=n=>{const t=v(n);document.querySelector(`option[value='${t}']`).selected=!0},y=(n="All")=>{a.currentList.dataset.name=v(n),a.currentList.textContent=n},W=()=>{const{addTodo:n,todoClose:t,todoForm:e,todoFormDiv:o,listFormDiv:s}=a;n.addEventListener("click",()=>{s.style.display!=="block"&&(D(o),window.innerWidth<1080&&(a.sidebar.style.transform="translate(-100%, 0)"))}),t.addEventListener("click",()=>{A(o),e.reset()})};let I=(n=21)=>crypto.getRandomValues(new Uint8Array(n)).reduce((t,e)=>(e&=63,e<36?t+=e.toString(36):e<62?t+=(e-26).toString(36).toUpperCase():e>62?t+="-":t+="_",t),"");class M{constructor(){this.todos={All:[]}}removeList(t){delete this.todos[t],this.pushToLocalStorage()}static localIsEmpty(){return localStorage.getItem("todos")===null}static clearLocalStorage(){return localStorage.clear()}setDataFromLocal(t){this.todos=JSON.parse(t)}pushToLocalStorage(){localStorage.setItem("todos",JSON.stringify(this.todos))}getTodosFromLocal(t){const e=t,o=localStorage.getItem("todos");this.constructor.localIsEmpty()?e.innerHTML="":this.setDataFromLocal(o)}}const h=new M;class ${constructor(){this.storage=h}delete(t,e){const o=v(e),s=this.storage.todos[o].findIndex(r=>r.id===t);this.storage.todos[o].splice(s,1),h.pushToLocalStorage()}updateEdit(t,e,o){const s=v(e),[r,d,l]=o;for(let c=0;c<this.storage.todos[s].length;c+=1)this.storage.todos[s][c].id===t&&(this.storage.todos[s][c].title=r,this.storage.todos[s][c].due=d,this.storage.todos[s][c].completed=l);h.pushToLocalStorage()}static getUpdatedValues(t){return t.map(o=>o.type==="checkbox"?o.checked:o.value)}saveData(t){const e=t.get("list"),o={id:I(),title:t.get("title"),due:t.get("due"),completed:!1};return this.storage.todos[e].push(o),this.storage.pushToLocalStorage(),o}getTodos(t="All"){return this.storage.todos[t]}getTotalTodos(t){return this.storage.todos[t].length}}const q=n=>{const t=n;t.style.display="none"},U=n=>{const t=n;t.style.display="block"},b=(n,t,e)=>{const o=t,s=n;s.innerHTML="";for(let r=0;r<o.length;r+=1){const d=o[r],l=e.todos[o[r]].length,c=E(d),u=document.createElement("div");u.dataset.name=d,u.classList.add("list");const m=document.createElement("div");m.classList.add("description");const p=document.createElement("p");p.classList.add("list-name");const g=document.createElement("p");g.classList.add("how-many"),g.textContent=l;const f=document.createElement("i");f.classList.add("list-del","fa-solid","fa-trash"),p.textContent=c,m.appendChild(p),m.appendChild(g),u.appendChild(m),u.appendChild(f),n.appendChild(u)}},C=(n,t)=>{document.querySelector(`[data-name="${t}"] .how-many`).textContent=n},T=(n,t)=>{const e=document.createElement("option"),o=E(n);e.setAttribute("value",n),e.textContent=o,t.appendChild(e)},H=n=>{document.querySelector(`option[value=${n}]`).remove()},V=()=>{a.sidebar.style.transform="translate(0,0)"},w=()=>{a.sidebar.style.transform="translate(-100%, 0)"},j=()=>{a.showNav.addEventListener("click",()=>{V()}),a.hideNav.addEventListener("click",()=>{w()})},J=()=>{const{addList:n,listClose:t,listForm:e,listFormDiv:o,todoFormDiv:s}=a;n.addEventListener("click",()=>{s.style.display!=="block"&&U(o)}),t.addEventListener("click",()=>{q(o),e.reset()})};class P{constructor(){this.storage=h}addListToStorage(t){const e=v(t);this.storage.todos[e]=[],this.storage.pushToLocalStorage()}getTodos(t){return this.storage.todos[t]}getLists(){return Object.keys(this.storage.todos)}delete(t){document.querySelector(`[data-name='${t}']`).remove(),this.storage.removeList(t)}}const i={list:new P,todo:new $};document.addEventListener("DOMContentLoaded",()=>{const n=new Date,t=new Intl.DateTimeFormat("en-US").format(n);a.currentDate.textContent=t,h.getTodosFromLocal(a.todosWrapper)});const K=()=>{const{listFormInput:n,listsWrapper:t,listDropdown:e}=a;J(),j(),a.listForm.addEventListener("submit",o=>{o.preventDefault();const s=n.value;i.list.addListToStorage(s),q(o.target.parentElement);const r=i.list.getLists();b(t,r,h),T(s,e),o.target.reset()}),document.addEventListener("click",o=>{const s=o.target.closest(".list-del");if(s){const r=s.parentElement,d=F(r);if(d==="All")return;i.list.delete(d),H(d);const l=i.todo.getTodos();L(a.todosWrapper,l),y()}}),document.addEventListener("DOMContentLoaded",()=>{const o=i.list.getLists();b(t,o,h),o.forEach(s=>{T(s,e)})})};K();const R=()=>{const{todoForm:n,todosWrapper:t}=a;W(),n.addEventListener("submit",e=>{e.preventDefault();const o=new FormData(n);i.todo.saveData(o);const s=o.get("list");A(e.target.parentElement);const r=i.todo.getTodos(s);L(t,r,s);const d=i.todo.getTotalTodos(s);C(d,s),N(n)}),document.addEventListener("click",e=>{if(e.target.closest(".edit")){const o=e.target.closest(".todo"),{id:s}=o,r=document.querySelector(".current-list").textContent,d=o.children[0].children,l=o.children[1].children[0],c=[].slice.call(d);if(c.push(l),d[0].disabled)k(c);else{x(c);const u=i.todo.constructor.getUpdatedValues(c);i.todo.updateEdit(s,r,u)}}}),document.addEventListener("click",e=>{if(e.target.closest(".delete")){const o=e.target.closest(".todo"),{id:s}=o,r=F(o);i.todo.delete(s,r);const d=i.todo.getTodos(r);L(a.todosWrapper,d,r);const l=i.todo.getTotalTodos(r);C(l,r)}}),document.addEventListener("click",e=>{if(e.target.closest(".list-name")){const o=e.target.textContent,s=v(o);O(o),y(o);const r=i.todo.getTodos(s);L(a.todosWrapper,r,s),window.innerWidth<1080&&w()}}),document.addEventListener("click",e=>{if(e.target.closest("option")){const o=e.target.closest("option").value,s=E(o);y(s);const r=i.todo.getTodos(o);L(a.todosWrapper,r,o)}}),document.addEventListener("DOMContentLoaded",()=>{const e=i.todo.getTodos();L(a.todosWrapper,e),y()})};R();
