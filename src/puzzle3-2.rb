#!/usr/bin/env ruby

def filter_lines (lines, inverted = false)

  reducedLines = lines.clone
  lineLength = lines[0].length
  index = 0
  while reducedLines.length != 1 && index != lineLength do
    counter = reducedLines.map { | line | line[index] }.reduce(0) {|sum, element| 
      if element == "1"
        sum += 1
      else 
        sum -= 1
      end
    }
    reducedLines = reducedLines.select { | line | 
      if counter >= 0
        if inverted
          line[index] == "0"
        else
          line[index] == "1"
        end
      else 
        if inverted
          line[index] == "1"
        else
          line[index] == "0"
        end
      end
    }
    index+=1
  end
  puts reducedLines.length
  reducedLines[0]
end

linesArray = Array.new
File.foreach("src/inputs/3") { | line |
  linesArray << line
}

a = filter_lines(linesArray).to_i(2)
b = filter_lines(linesArray, true).to_i(2)
puts a * b
