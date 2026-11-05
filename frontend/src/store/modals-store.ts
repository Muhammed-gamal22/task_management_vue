import { defineStore } from 'pinia'

interface TaskState {
    isOpenTaskModal: boolean
    isEdit: boolean
}

export const useTaskStore = defineStore('task', {
    state: (): TaskState => ({
        isOpenTaskModal: false,
        isEdit: false,
    }),

    actions: {
        setIsTaskModalOpen(isOpenTaskModal: boolean) {
            this.isOpenTaskModal = isOpenTaskModal
        },

        setIsEdit(isEdit: boolean) {
            this.isEdit = isEdit
        },
    },
})