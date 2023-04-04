ALL_WORDS = []
ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

def strip_line(line):
    line = line.lower()
    newline = ""
    for char in line:
        if char in ALPHABET:
            newline += char
    return newline

def read_words(filename):
    f = open(filename, "r")
    for line in f:
        ALL_WORDS.append(strip_line(line))
    f.close()

def print_results():
    for word in ALL_WORDS:
        result = "'" + word + "',\n"
        with open("words.js", "a") as file:
            file.write(result)

def main():
    read_words("commonwords.txt")
    print_results()

main()