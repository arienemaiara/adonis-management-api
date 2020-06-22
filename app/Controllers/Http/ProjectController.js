'use strict'

const Project = use('App/Models/Project')

class ProjectController {

  async index ({ request, response, view }) {
    try {
      const projects = await Project.query()
        .with('user')
        .fetch()

      return projects
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Something went wrong.' } })
    }
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description'])

      const project = await Project.create({ ...data, user_id: auth.user.id })

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Something went wrong.' } })
    }
  }

  async show ({ params, request, response, view }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return project

    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Project not found.' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project

    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Project not found.' } })
    }
  }

  async destroy ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
  }
}

module.exports = ProjectController
