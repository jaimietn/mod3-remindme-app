class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :due, :completed, :user_id
  # set_id :user_id
  belongs_to :user, include_nested_associations: true

end
