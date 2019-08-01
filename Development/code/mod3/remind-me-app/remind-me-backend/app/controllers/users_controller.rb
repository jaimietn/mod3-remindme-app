class UsersController < ApplicationController
  # before_action :current_user, only: [:show, :feed]

  def index
    users = User.all
    render json: UserSerializer.new(users)
    # @users = User.all
    # render json: (@users)
  end

  def show
    user = User.find(params[:id])
    render json: UserSerializer.new(user)
    # @user = User.find(params[:id])
    # render json: (@user)
    #if session user matches @user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.find_or_create_by(user_params)
    # session[:user_id] = @user.id
    # redirect_to user_feed_path(@user)
    render json: (@user)
  end

  private
  def user_params
    params.require(:user).permit(:name)
  end

end
