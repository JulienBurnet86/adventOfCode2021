#!/usr/bin/env ruby

counterOne = Array.new()
counterZero = Array.new()

File.foreach("src/inputs/3") { | line |
  puts line
  arr = line.strip.split("")
  arr.each_with_index {|value, index| 
    if value == '1' then
      if counterOne[index] == nil
        counterOne[index] = 1
      else
        counterOne[index] = counterOne[index] + 1
      end
    else
      if counterZero[index] == nil
        counterZero[index] = 1
      else
        counterZero[index] = counterZero[index] + 1
      end
    end
  }
}

puts counterOne.join(",")
puts counterZero.join(",")

gamma = ""
epsilon = ""
counterOne.each_with_index { |value, index | 
  if value > counterZero[index]
    gamma += "1"
    epsilon += "0"
  else 
    gamma += "0"
    epsilon += "1"
  end
}

puts gamma.to_i(2)
puts epsilon.to_i(2)
puts "res #{(gamma.to_i(2) * epsilon.to_i(2))} " 