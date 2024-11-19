import{d as P,a as y,_ as v,o as i,c as u,b as n,t as d,e as p,f as A,g as x,n as L,w as E,h,i as O,j as z,u as F,r as T,F as j,k as D,l as M,m as g,P as K,B as b,p as U,I as q,v as B}from"./index-CfPShsPr.js";const f=P("notes",{state:()=>({notes:[]}),actions:{setNotes(e){this.notes=e},setNewNote(e){this.notes=[e,...this.notes]},deleteNote(e){this.notes=this.notes.filter(o=>o.id!==e)}},getters:{getNotes:e=>e.notes}}),k="https://dist.nd.ru/api",H=async()=>{if(localStorage.getItem("token")){const e=localStorage.getItem("token"),{data:o}=await y.get(`${k}/notes`,{headers:{Authorization:`Bearer ${e}`}});return f().setNotes(o),o}},G=async({title:e,content:o})=>{if(localStorage.getItem("token")){const a=localStorage.getItem("token"),{data:l}=await y.post(`${k}/notes`,{title:e,content:o},{headers:{Authorization:`Bearer ${a}`}});f().setNewNote(l)}},J=async e=>{if(localStorage.getItem("token")){const o=localStorage.getItem("token");await y.delete(`${k}/notes/${e}`,{headers:{Authorization:`Bearer ${o}`}}),f().deleteNote(e)}},Q={},R={width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function W(e,o){return i(),u("svg",R,o[0]||(o[0]=[n("path",{d:"M1 9H17M9 1L9 17",stroke:"white","stroke-width":"2","stroke-linecap":"round"},null,-1)]))}const X=v(Q,[["render",W]]),Y={},Z={width:"19",height:"18",viewBox:"0 0 19 18",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function tt(e,o){return i(),u("svg",Z,o[0]||(o[0]=[n("path",{d:"M1.66699 1L17.667 17M17.667 1L1.66699 17",stroke:"white","stroke-width":"2","stroke-linecap":"round"},null,-1)]))}const et=v(Y,[["render",tt]]),ot={class:"note-wrapper"},st={class:"note"},nt={class:"title-wrrapper"},at={class:"title"},rt={class:"content"},it={class:"actions"},lt={__name:"NoteComponent",props:{data:{type:Object,required:!0}},setup(e){const o=a=>{J(a)};return(a,l)=>(i(),u("div",ot,[n("div",st,[n("div",nt,[n("span",at,d(e.data.title),1)]),n("div",rt,d(e.data.content),1),n("div",it,[n("button",{onClick:l[0]||(l[0]=m=>o(e.data.id))},[p(et),l[1]||(l[1]=A(" Удалить "))])])])]))}},ut=v(lt,[["__scopeId","data-v-80ac926a"]]),ct={class:"input"},dt=["for"],pt={class:"input-wrapper"},ht=["id","placeholder","value","maxlength"],mt={class:"input-service"},gt={key:0,class:"error-message"},vt={key:1,class:"max-length"},_t={__name:"TextAreaComponent",props:{title:{type:String,default:"Введите значение"},placeholder:{type:String,default:"Введите значение"},inputValue:{type:String},errorMessage:{type:String,default:"Не правильно заполненные данные"},maxLength:{type:Number},id:{type:String,default:""}},emits:["updateInput","submit"],setup(e,{emit:o}){const a=e,l=o,m=t=>{l("updateInput",t.target.value)},w=()=>{l("submit")},$=x(()=>a.inputValue.length);return(t,N)=>(i(),u("div",ct,[n("label",{for:e.id},d(e.title),9,dt),n("div",pt,[n("textarea",{id:e.id,class:L({error:e.errorMessage}),placeholder:e.placeholder,type:"text",value:e.inputValue,maxlength:e.maxLength,onInput:m,onKeydown:E(w,["enter"])},null,42,ht)]),n("div",mt,[e.errorMessage?(i(),u("div",gt,d(e.errorMessage),1)):h("",!0),e.maxLength?(i(),u("div",vt,d($.value)+"/"+d(e.maxLength),1)):h("",!0)])]))}},ft=v(_t,[["__scopeId","data-v-ae308368"]]),wt={class:"note-section"},xt={class:"notes"},yt={class:"popup-title"},kt={class:"popup-actions"},$t={key:0},Nt={key:1,class:"loader"},It={key:0,class:"popup-error"},St={__name:"NotesView",setup(e){O(async()=>{await z(),await H()});const o=f(),a=F(),l=async()=>{a.setIsPopupOpen("note",!0)},m=x(()=>o.getNotes),w=x(()=>a.getIsPopupOpen),t=T({title:"Добавление заметки",button:"Добавить",method:async()=>{const[c,s]=t.inputs,r={title:c.value,content:s.value},S=B("title",c.value),C=B("content",s.value);try{if(S||C){t.inputs[0].error=S,t.inputs[1].error=C;return}I(t),a.setIsLoading(!0),await G(r),a.setIsLoading(!1),a.setIsPopupOpen(null,!1),_("",0,t),_("",1,t)}catch(V){t.errorMessage=V.response.data.message,a.setIsLoading(!1)}},inputs:[{name:"title",title:"Название заметки",placeholder:"Введите название",type:"text",length:100,value:"",error:""},{name:"content",title:"Текст заметки",placeholder:"Введите текст",type:"text",length:255,value:"",error:"",id:"notes-text"}],errorMessage:""}),N=c=>{c.inputs.forEach(s=>{s.value=""})},I=c=>{c.inputs.forEach(s=>{s.error=""}),c.errorMessage=""},_=(c,s,r)=>{r.inputs[s].value=c};return(c,s)=>(i(),u("main",null,[n("section",wt,[n("div",xt,[(i(!0),u(j,null,D(m.value,r=>(i(),M(ut,{key:r.id,data:r},null,8,["data"]))),128))]),w.value.type==="note"?(i(),M(K,{key:0,onClosePopup:s[3]||(s[3]=r=>(N(t),I(t)))},{title:g(()=>[n("div",yt,d(t.title),1)]),content:g(()=>[n("form",{onSubmit:s[2]||(s[2]=U(()=>{},["prevent"])),class:"popup-form"},[p(q,{title:t.inputs[0].title,placeholder:t.inputs[0].placeholder,"input-value":t.inputs[0].value,"input-type":t.inputs[0].type,"error-message":t.inputs[0].error,id:t.inputs[0].id,autocomplete:t.inputs[0].autocomplete,"max-length":t.inputs[0].length,onUpdateInput:s[0]||(s[0]=r=>_(r,0,t))},null,8,["title","placeholder","input-value","input-type","error-message","id","autocomplete","max-length"]),p(ft,{title:t.inputs[1].title,placeholder:t.inputs[1].placeholder,"input-value":t.inputs[1].value,"error-message":t.inputs[1].error,id:t.inputs[1].id,autocomplete:t.inputs[1].autocomplete,"max-length":t.inputs[1].length,onUpdateInput:s[1]||(s[1]=r=>_(r,1,t)),onSubmit:t.method},null,8,["title","placeholder","input-value","error-message","id","autocomplete","max-length","onSubmit"])],32)]),action:g(({isLoading:r})=>[n("div",kt,[p(b,{class:L({loading:r}),onClick:t.method},{default:g(()=>[r?h("",!0):(i(),u("span",$t,d(t.button),1)),r?(i(),u("span",Nt)):h("",!0)]),_:2},1032,["class","onClick"])]),t.errorMessage?(i(),u("div",It,d(t.errorMessage),1)):h("",!0)]),_:1})):h("",!0),p(b,{class:"round addNote",onClick:l},{default:g(()=>[p(X)]),_:1})])]))}},Mt=v(St,[["__scopeId","data-v-420c7b1f"]]);export{Mt as default};