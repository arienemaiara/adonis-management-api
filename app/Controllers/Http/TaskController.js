'use strict'

const Task = use('App/Models/Task')

class TaskController {

  async index ({ params }) {
    try {
      const tasks = await Task.query()
        .where('project_id', params.projects_id)
        .with('user')
        .fetch()

      return tasks

    } catch (error) {
      
    }
  }

  async store ({ params, request }) {
    try {
      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      const task = await Task.create({ ...data, project_id: params.projects_id })

      return task

    } catch (error) {
      
    }
  }

  async show ({ params }) {
    try {
      
      const task = await Task.findOrFail(params.id)

      return task

    } catch (error) {
      
    }
  }

  async update ({ params, request }) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      task.merge(data)

      await task.save()

      return task

    } catch (error) {
      
    }
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
