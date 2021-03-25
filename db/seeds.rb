# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(first_name: "John", last_name: "Doe",
             email: "john@example.com", password: "123456", password_confirmation: "123456")

User.create!(first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "123456", password_confirmation: "123456", is_admin: true)

Cafe.create(name: "Starbucks Charmvit",
            description: "Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.",
            district: "Cau Giay",
            address: "Charm Vit Tower A, 117 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 100000, Vietnam",
            price: "4",
            hours: "6:30am-6pm",
            images: ["https://www.google.com/maps/uv?pb=!1s0x3135aca6eb8e05a3:0xe02d23034fbf190a!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipPagc9Y66ir42u80hZhK7ahK0rSqOYEfO9K5xk%3Dw239-h160-k-no!5sstarbucks+charmvit+-+Google+Search!15zQ2dJZ0FRPT0&imagekey=!1e10!2sAF1QipPagc9Y66ir42u80hZhK7ahK0rSqOYEfO9K5xk&hl=en&sa=X&ved=2ahUKEwi3ypPjkcvvAhUKE6YKHfHyB5IQoiowE3oECCEQAw"])
