# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Rails.env.development?
  User.create!(first_name: "John", last_name: "Doe",
               email: "john@example.com", password: "123456", password_confirmation: "123456")

  User.create!(first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "123456", password_confirmation: "123456", is_admin: true)

  Cafe.create(name: "Starbucks Charmvit",
              description: "Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.",
              district: "Cau Giay",
              address: "Charm Vit Tower A, 117 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 100000, Vietnam",
              price: "4",
              hours: "6:30am-6pm",
              images: ["https://media.foody.vn/res/g69/688220/prof/s/foody-mobile-21463229_17672929133-461-636409132441098086.jpg"],
              tags: ["Parking space"],
              is_shown: true)

  Review.create(cafe_id: 1, user_id: 1, rating: 5, title: "This is an excellent cafe!", content: "I like this place a lot!")
  Review.create(cafe_id: 1, user_id: 2, rating: 2, title: "This is a meh cafe!", content: "I don't really like this place...")
elsif Rails.env.production?
  Cafe.create(name: "Starbucks Charmvit",
              description: "Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.",
              district: "Cau Giay",
              address: "Charm Vit Tower A, 117 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 100000, Vietnam",
              price: "4",
              hours: "6:30am-6pm",
              images: ["https://media.foody.vn/res/g69/688220/prof/s/foody-mobile-21463229_17672929133-461-636409132441098086.jpg"],
              tags: ["Parking space"],
              is_shown: true)
end
