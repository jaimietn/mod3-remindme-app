class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :tasks
  has_many :tasks, include_nested_associations: true
end
