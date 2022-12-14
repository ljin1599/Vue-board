import { defineStore } from "pinia";    // defineStore 함수를 이용하여 각각의 파일마다 별도의  store를 정의하여 module의 기능을 대신한다, 타입 추론에 대한 그 어떤 작업도 추가로 필요하지 않다
import { ref, computed } from "vue";    // ref : 내부에 갑을 가지면서 반응적이고 변경 가능, 단 하나의 프로퍼티를 가짐, computed : 반응 데이터를 포함하는 복잡한 논리의 경우 사용, data 바뀐 값에 따라 computed 값도 자동으로 바뀐다.
import axios from 'axios'

export const BoardListStore = defineStore("boards", () => {

    const boards = ref([ ])

    async function addboard(list) {
        const res = await axios.post(`/board`, {id:list.id, title: list.title, content: list.content}) // 양방향  데이터 통신 v-model 이용 값 받아오기
            try {
                    boards.value = [...boards.value, res.data]; // 서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
            } catch {
                console.log(err);
            }
        console.log(boards.value.id)
    } 

    async function readboard() {
        const res = await axios.get(`/board?&_sort=id&_order=desc`) 
            try { 
                boards.value = res.data;
            } catch {
                console.log(err);
            }
            console.log(ListAll.value.length)
    }

    async function detailboard(id) {
        const res = await axios.get(`/board/${id}`)
            try { 
                boards.value.id = res.data.id
                boards.value.title = res.data.title
                boards.value.content = res.data.content
            } catch {
                console.log(err);
            }
            console.log("detailboard")
    }

    async function updateboard(list) {
        const res = await axios.patch(`/board/${list.id}`, {id: list.id, title: list.title, content: list.content})
            try {
                console.log(res.data);
            } catch {
                console.log(err);
            }
            console.log("updateboard")
    }

    async function deleteboard(id) {
        const res = await axios.delete(`/board/${id}`)
            try {
                boards.value = boards.value.filter(board => board.id !== id)
                console.log(res);
            } catch {
                console.log(err);
            }
            console.log("delete");
    }

    const ListAll = computed( () => boards.value ); // boards.value 값에 따라  ListAll 값이 자동으로 바뀐다

    return { addboard,  readboard, detailboard, updateboard, deleteboard, ListAll };
})









/*  axios 사용 특정 페이지 출력
    async function pageboard(page) {
        const res = await axios.get(`/board?&_page=${page}&_sort=id&_order=desc&_limit=5`)   // 페이지 번호를 받아서 id를 기준으로 내림 차순 정렬로 5개씩 페이지에 정렬
        try {
            boards.value = res.data
            console.log(boards.value.length)
            console.log(page)
        } catch {
            console.log(err)
        }
    }*/