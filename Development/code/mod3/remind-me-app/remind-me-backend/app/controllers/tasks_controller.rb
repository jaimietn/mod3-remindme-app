class TasksController < ApplicationController

  def index
    tasks = Task.all
    render json: TaskSerializer.new(tasks)
    # @tasks = Task.all
    # render json: (@tasks)
  end

  def show
    task = Task.find(params[:id])
    render json: TaskSerializer.new(task)
    # @task = Task.find_by(params[:id])
    # render json: (@task)
  end

  def new
    @task = Task.new
    @user = User.find(session[:user_id])
  end

  def create
    @task = Task.create(create_task_params)
  end

  private

  def create_task_params
    params.require(:task).permit(:title, :description, :due, :user_id)
  end

end
