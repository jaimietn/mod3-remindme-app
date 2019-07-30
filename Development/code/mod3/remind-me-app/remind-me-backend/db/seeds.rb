# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Task.destroy_all

User.create(name: "Jaimie")
User.create(name: "Mary")


puts "Made users!"

Task.create(title: "finish project", description: "this is taking forever why is it taking forever", due: "this week", completed: false, user_id: 1)
Task.create(title: "date a vampire", description: "I love vampires so much I want to be a vampire so bad", due: "today", completed: false, user_id: 2)

puts "Made tasks!"
