# def main(x):
#     return x

code = 'def main(x):\n\treturn x * 2'
print(code)
exec(code)
x = main(1)
print(x)
